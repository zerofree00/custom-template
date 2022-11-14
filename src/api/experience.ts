import axios from './request'
import { Page } from './interface'

interface ExperiencePage extends Page{
  queryDTO: {
  }
}
export const experiencePage = (data: ExperiencePage) => axios.post('/app/book/experience/page', data) // 读书体会分页查询

export const experienceDetail = (id:string) => axios.get(`/app/book/experience/${id}`) // 读书体会详情页

export const experienceReplyPage = (experienceId: string) => axios.get(`/app/book/experienceReply/list/${experienceId}`) // 读书体会分页查询

export const addExperienceReply = (data: any) => axios.post('/app/book/experienceReply', data) // 新增评论

export const addLike = (data: any) => axios.post('/app/book/experienceRecord', data) // 新增点赞

export const deleteLike = (ids:string) => axios.delete(`/app/book/experienceRecord/${ids}`) // 取消点赞

export const databasePage = (data: ExperiencePage) => axios.post('/app/book/doc/page', data) // 政协资料库分页查询

export const databaseDetail = (id: string) => axios.get(`/app/book/doc/${id}`) // 政协资料库详情

export const notifyPage = (data: ExperiencePage) => axios.post('/app/book/notify/page', data) // 书院公告分页查询

export const notifyDetail = (id:string) => axios.get(`/app/book/notify/${id}`) // 书院公告详情
