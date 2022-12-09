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

export const notifyPage = (data: ExperiencePage) => axios.post('/app/book/notify/page', data) // 书院公告分页查询

// 学习资料
export const recommendPage = (data: ExperiencePage) => axios.post('/app/book/recommend/page', data) // 书籍推荐 分页查询

export const addRecommend = (data: {
  bookAuthor: string,
  bookCover?: string,
  bookName: string,
  bookProfile: string
}) => axios.post('/app/book/recommend/add/check', data) // 新增委员推荐

export const recommendDetail = (id:string) => axios.get(`/app/book/recommend/${id}`) // 书籍推荐详情

export const recentStudyPage = (data: ExperiencePage) => axios.post('/app/book/book/recent/study', data) // 政协书屋 近期读书

export const bookSearch = (data: ExperiencePage) => axios.post('/app/book/book/search', data) // 政协书屋搜索 全部书籍

export const bookDetail = (id: string) => axios.get(`/app/book/book/${id}`) // 政协书屋-书籍详情

export const bookCollect = (data: {
  bookId: string,
  sourceType: string
}) => axios.post('/app/book/book/collect/concel', data) // 取消收藏

export const bookCollectAdd = (data: {
  bookId: string,
  sourceType: string
}) => axios.post('/app/book/book/collect/add', data) // 添加收藏

export const bookHot = (data: {
  isRecommend: number // 1推荐 0未推荐 -1全部
}) => axios.post('/app/book/book/hot', data) // 热门书籍

export const bookNew = (data: {
  isRecommend: number // 1推荐 0未推荐 -1全部
}) => axios.post('/app/book/book/latest', data) // 最新书籍

export const bookRead = (data: any) => axios.post('/app/book/book/read', data) // 书籍阅读时间统计

export const dynamicPage = (data: ExperiencePage) => axios.post('/app/book/dynamic/page', data) // 读书动态分页查询

export const dynamicDetail = (id: string) => axios.get(`/app/book/dynamic/${id}`) // 读书动态详情
