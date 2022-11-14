/* tslint:disable */

import CryptoJS from 'crypto-js'
export const backApp = function () {
  const u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    // @ts-ignore
    // @ts-ignore
    JsBridge.backApp()
  }
  if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
    // @ts-ignore
    // @ts-ignore
    window.webkit.messageHandlers.backApp.postMessage('')
  }
}

export const goAppBookDetail = function (data: {
  bookId: string
  iframeUrl: string
  bookName:string
}) {
  // 传参数给app
  try {
    const u = navigator.userAgent

    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
      // @ts-ignore
      // @ts-ignore
      JsBridge.goAppBookDetail(JSON.stringify(data))
    }
    if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
      // @ts-ignore
      // @ts-ignore
      window.webkit.messageHandlers.goAppBookDetail.postMessage(
        JSON.stringify(data)
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export const addUser = function (data: string) {
  // 传参数给app
  try {
    const u = navigator.userAgent

    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
      // @ts-ignore
      JsBridge.addUser(data)
    }
    if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
      // @ts-ignore
      window.webkit.messageHandlers.addUser.postMessage(data)
    }
  } catch (error) {
    console.log(error)
  }
}

export const joinGroup = function (data: string) {
  // 进入群聊
  try {
    const u = navigator.userAgent

    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
      // @ts-ignore
      JsBridge.joinGroup(data)
    }
    if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
      // @ts-ignore
      window.webkit.messageHandlers.joinGroup.postMessage(data)
    }
  } catch (error) {
    console.log(error)
  }
}

// 获取url参数
export const getUrlParams = function () {
  const url = location.href // 获取url中"?"符后的字串
  const theRequest: {
    [propName: string]:string
  } = {}
  if (url.indexOf('?') !== -1) {
    const str = url.split('?')[1]
    const strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
    }
  }
  return theRequest
}

// // 获取经纬度
// export const getAddress = function (x, y) {
//   const u = navigator.userAgent
//   if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
// @ts-ignore//
// JsBridge.getAddress(x, y)
//   }
//   if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
// @ts-ignore//
// window.webkit.messageHandlers.getAddress.postMessage(`${x},${y}`)
//   }
// }

// // 获取语音转文字方法
// export const getVoiceText = function () {
//   const u = navigator.userAgent
//   if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
//     // @ts-ignore
//     JsBridge.getVoiceText()
//   }
//   if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
//     // @ts-ignore
//     window.webkit.messageHandlers.getVoiceText.postMessage('')
//   }
// }
// 获取相机相册权限
export const getCamarePermission = function () {
  const u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    // @ts-ignore
    JsBridge.getCamarePermission('')
  }
  if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
    // @ts-ignore
    window.webkit.messageHandlers.getCamarePermission.postMessage('')
  }
}
// // goAppOpenFile

export const goAppOpenFile = function (
  data: {
    // eslint-disable-next-line camelcase
    strFile_url: string
    // eslint-disable-next-line camelcase
    strFile_name: string
  }
) {
  // 传参数给app
  try {
    const u = navigator.userAgent

    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
      // @ts-ignore
      JsBridge.goAppOpenFile(JSON.stringify(data))
    }
    if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
      // @ts-ignore
      window.webkit.messageHandlers.goAppOpenFile.postMessage(
        JSON.stringify(data)
      )
    }
  } catch (error) {
    console.log(error)
  }
}
// // 调用app扫码方法
// export const scanCode = function () {
//   const u = navigator.userAgent
//   if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
// @ts-ignore//
// JsBridge.scanCode()
//   }
//   if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
// @ts-ignore//
// window.webkit.messageHandlers.scanCode.postMessage('')
//   }
// }

export const loginOut = function (data:string = '') {
  // 进入群聊
  try {
    const u = navigator.userAgent

    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
      // @ts-ignore
      JsBridge.loginOut('')
    }
    if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
      // @ts-ignore
      window.webkit.messageHandlers.loginOut.postMessage(data)
    }
  } catch (error) {
    console.log(error)
  }
}

// getBookDataFromApp
// getGroupUserIds
// setGroupUserIds

export const openUrl = function (data: {
  url: string,
  type: 1 | 0, // 1= 第三方，0=自身系统
}) {
  const u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    // @ts-ignore
    JsBridge.openUrl(JSON.stringify(data))
  }
  if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
    // @ts-ignore
    window.webkit.messageHandlers.openUrl.postMessage(JSON.stringify(data))
  }
}

export const getGroupUserIds = function () {
  const u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    // @ts-ignore
    JsBridge.getGroupUserIds('')
  }
  if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
    // @ts-ignore
    window.webkit.messageHandlers.getGroupUserIds.postMessage('')
  }
}

export const handlingview = function () {
  const u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    // @ts-ignore
    JsBridge.handlingview('')
  }
  if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
    // @ts-ignore
    window.webkit.messageHandlers.handlingview.postMessage('')
  }
}

// aes加密
export function encrypt (word:any) {
  const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CRYPTOKEY)
  const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CRYPTOIV)
  // 加密
  const encrypted = CryptoJS.AES.encrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}
