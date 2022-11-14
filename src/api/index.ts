import axios from './request'
import { SelectMemberType, CollectiveLeftType, CollectiveRightType } from './interface/index'
// const getOrg = (trustNo: string) => axios.get(`/cppcc/sso/app/org/${trustNo}`) // 获取机构信息、

// const login = (data:LoginData) => axios.post('/cppcc/sso/app/login', data) // 登录

// export { getOrg, login }
export const getFileList = (affairId: string) => axios.get(`/sys/oss/list/${affairId}`)

export const getParamList = (typeName: string) => axios.get(`/param/list/${typeName}`) // 获取公共数据字典

export const getProposalType = () => axios.get('/app/member/proposal/type/options') // 获取提案状态

export const getProposalSessionApi = () => axios.get('/app/proposalSession/list') // 获取提案届次

export const selectMember = (data: SelectMemberType) => axios.post('/select/member/app', data) // app政协委员数据

export const collectiveLeft = (data: CollectiveLeftType) => axios.post('/select/collective/left', data) // app集体用户选择左边

export const collectiveRight = (data: CollectiveRightType) => axios.post('/select/collective/right', data) // app集体用户选择右边

export const officeRight = (data: any) => axios.post('/addressBook/user', data) // app机关人员选择右边

export const getIdApi = () => axios.get('/id/get') // 获取id

export const getSessionYear = () => axios.get('/upmsCppccSession/year') // 获取届次年份

export const uploadFile = (data:any) => axios.post('/sys/oss/upload', data) // 上传附件

export const deleteFile = (ids:string) => axios.delete(`/sys/oss/delete/${ids}`) // 删除附件
