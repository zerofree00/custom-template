import { getCurrentMeetingApi } from '@/api/metting'
import { Dialog } from 'vant'
import router from '@/router/index'
import { store } from '@/store'

let lockReconnect = false // 避免重复连接
const socketUrl = window.$config.$socketUrl
let Socket: any // WebSocket
let tt: any = null

export const createSocket = () => {
  if (!localStorage.getItem('sid')) return
  getCurrentMeetingApi().then(() => {
  })
  try {
    Socket = new WebSocket(socketUrl + localStorage.getItem('sid'))
    lockReconnect = false
    init()
  } catch (e) {
    console.log('catch', e)
  }
}

// 心跳检测
const heartCheck = {
  timeout: 5000, // 5s发一次心跳
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function () {
    // @ts-ignore
    clearTimeout(this.timeoutObj)
    // @ts-ignore
    clearTimeout(this.serverTimeoutObj)
    return this
  },
  start: function () {
    const self = this
    this.timeoutObj && clearTimeout(this.timeoutObj)
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
    // @ts-ignore
    this.timeoutObj = setTimeout(function () {
      // 这里发送一个心跳，后端收到后，返回一个心跳消息，
      // onmessage拿到返回的心跳就说明连接正常
      Socket.send('ping')
      // @ts-ignore
      self.serverTimeoutObj = setTimeout(function () {
        console.log('没有收到后台的数据，关闭连接')
        Socket.close()
        // createSocket();
      }, self.timeout)
    }, this.timeout)
  }
}
const init = () => {
  Socket.onclose = function () {
    console.log('连接关闭')
    reconnect()
  }
  Socket.onerror = function () {
    console.log('发生异常了')
    reconnect()
  }
  Socket.onopen = function () {
    // 打开Socket之后发送心跳---心跳检测重置
    heartCheck.start()
  }
  Socket.onmessage = function (event: any) {
    // 拿到任何消息都说明当前连接是正常的
    heartCheck.reset().start()
    window.dispatchEvent(
      new CustomEvent('onmessageWS', {
        detail: {
          data: event.data
        }
      })
    )
  }
}

const reconnect = () => {
  if (lockReconnect) {
    return
  }
  lockReconnect = true
  // 没连接上会一直重连，设置延迟避免请求过多
  tt && clearTimeout(tt)
  tt = setTimeout(function () {
    createSocket()
    lockReconnect = false
  }, 10000)
}

/**
 * 关闭Socket
 */
export const closeSocket = (fn: any) => {
  console.log('Socket==', Socket)
  // 在需要的时候卸载监听事件，比如离开页面
  // @ts-ignore
  window.removeEventListener('onmessageWS', getsocketDataFunc)
  // console.log('closeSocket')
  clearTimeout(tt)
  lockReconnect = true
  heartCheck.reset()
  if (Socket) {
    Socket.close()
    Socket = null
  }
  fn && fn()
}

/**
 * 创建 Socket ， 添加数据
 */
export const createSocket2 = () => {
  console.log('createSocket2===')
  if (Socket) {
    closeSocket(createSocket)
  } else {
    createSocket()
  }
  // 注册监听事件
  // @ts-ignore
  window.addEventListener('onmessageWS', getsocketDataFunc)
}

const getsocketDataFunc = async function (e: any) {
  const dataJson = e && e.detail.data
  const data = JSON.parse(dataJson)

  // {"code": 200} //连接成功
  // {"code": 300,"event":"changeMeeting","strMeetingId":"11111"}
  // {"code": 400} //账号被登录
  // {"code": 500} //异常信息
  if (data.code === '300') {
    console.log('getsocketData 300=', data)
    // let receiveObj = JSON.parse(data)
    if (data.event === 'changeCommittee') { // 切换会议
      if (data.committeeId) {
        await getMeetingDataHandle()
      } else {
        localStorage.removeItem('currentMeetingId')
        localStorage.removeItem('currentMeeting')
      }
      store.commit('soketMeetingId', `${data.committeeId || ''}_${new Date().getTime()}_${data.event}`)
    } else if (data.event === 'updateCommittee') {
      // 切换议题、会议更改、议题更改
      if (data.meetingId) {
        await getMeetingDataHandle()
      }
      store.commit('soketMeetingId', `${data.meetingId || ''}_${new Date().getTime()}_${data.event}`)
    }
  } else if (data.code === '400') {
    // @ts-ignore
    closeSocket()
    Dialog.alert({
      title: '提示',
      message: '您的账号在其他设备登录，如非本人操作，请确认账号是否被盗，并及时修改登录密码。'
    }).then(() => {
      // console.log('router==', router)
      router.replace('/login')
    })
    return false
  } else if (data.code === '500') {
    console.log(data.message)
  }
}
const getMeetingDataHandle = async function () {
  // 获取当前会议信息
  await getCurrentMeetingApi()
}
