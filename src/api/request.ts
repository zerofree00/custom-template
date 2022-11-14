import { store } from '@/store'
import axios from 'axios'
import { Toast } from 'vant'
import { handlingview } from '@/utils/utils'
// import router from '@/router'
// import qs from 'qs'
const validateStatus = (status:number):boolean => {
  return status >= 200 && status < 300
}
export const request = axios.create({
  // 如果是开发环境走代理，如果是线上环境去对应环境变量
  baseURL: import.meta.env.VITE_API_BASEURL
})
// 'https://shop.fed.lagou.com/api/admin'
// 请求拦截
request.interceptors.request.use(config => {
  const { userInfo } = store.state
  if (userInfo && userInfo.token) {
    config.headers!.token = userInfo.token
  }
  // 统一身份认证token
  return config
}, error => {
  // 抛出异常
  return Promise.reject(error)
})

// 响应拦截器
let isRfreshing = false // 控制刷新 token 的状态
let requests: Array<any> = [] // 存储刷新 token 期间过来的 401 请求
const refreshToken = function () {
  return axios.get(import.meta.env.VITE_API_BASEURL + '/sso/app/refresh/token/' + store.state.userInfo?.refreshToken, {
    headers: { token: store.state.userInfo?.token as string }
  })
}
request.interceptors.response.use((response) => {
  if (!response.data || response.data.constructor !== Object) {
    Toast.fail('服务器异常')
    return Promise.reject(new Error('wrong'))
  }
  if (response.data.constructor === Object) {
    // response.data.msg = response.data.msg || '操作失败' + response.data.code;
    const { code, msg } = response.data
    if (!validateStatus(code) && code !== undefined) {
      Toast.fail(msg)
      // 返回错误状态
      return Promise.reject(msg)
    }
    if (response.data.globa_sessionTimeOut === -1) {
      Toast.fail(response.data.tip)
    }
  }

  setTimeout(() => {
    Toast.clear()
  }, 1000)
  return response.data.data
}, error => {
  // 抛出异常处理
  const { status } = error.response
  if (status === 401) {
    if (!store.state.userInfo || !store.state.userInfo?.refreshToken) {
      // Toast('登录已过期，请重新登录')
      // 跳转到登录页面
      // router.push('/login')
      handlingview()
      return Promise.reject(error)
    }

    // 刷新 token
    if (!isRfreshing) {
      isRfreshing = true // 开启刷新状态
      // 尝试刷新获取新的 token
      return refreshToken()
        .then(res => {
          // 刷新 token 成功了
          store.state.userInfo.token = res?.data?.data
          // 把 requests 队列中的请求重新发出去
          requests.forEach(cb => cb())
          // 重置 requests 数组
          requests = []
          return request(error.config)
        })
        .catch(() => {
          // 跳转到登录页面
          // Toast('登录已过期，请重新登录')
          // router.push('/login')
          handlingview()
          return Promise.reject(error)
        })
        .finally(() => {
          isRfreshing = false // 重置刷新状态
        })
    }
    // 刷新状态下，把请求挂起放到 requests 数组中
    return new Promise(resolve => {
      requests.push(() => {
        resolve(request(error.config))
      })
    })
  }
  return Promise.reject(error.response?.data?.msg)
})
export default request
