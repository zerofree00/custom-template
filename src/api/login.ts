import axios from './request'
import { LoginData } from './interface/index'

const getOrg = (trustNo: string) => axios.get(`/sso/app/org/${trustNo}`, {
  baseURL: import.meta.env.VITE_API_UPMSURL
}) // 获取机构信息、

const login = (data:LoginData) => axios.post('/sso/app/login', data, {
  baseURL: import.meta.env.VITE_API_UPMSURL
}) // 登录

export { getOrg, login }
