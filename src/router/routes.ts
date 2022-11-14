import { RouteRecordRaw } from 'vue-router'
export const routes: RouteRecordRaw[] = [
  {
    path: '/', // 默认进入首页
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/Index/index.vue')
  },
  {
    path: '/:pathMatch(.*)*', // 处理404页面找不到的情况
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue')
  },
  {
    path: '/download/index', // 下载页
    name: 'download/index',
    component: () => import('@/views/download/index.vue')
  },
  {
    path: '/dynamic/index', // 读书动态
    name: 'dynamic/index',
    component: () => import('@/views/Dynamic/index.vue')
  },
  {
    path: '/dynamic/detail/:id', // 读书动态详情
    name: 'dynamic/detail',
    component: () => import('@/views/Dynamic/detail.vue')
  },
  {
    path: '/dynamic/add', // 读书动态新增
    name: 'dynamic/add',
    component: () => import('@/views/Dynamic/add.vue')
  },
  {
    path: '/experience/index', // 读书书评
    name: 'experience/index',
    component: () => import('@/views/Experience/list.vue')
  },
  {
    path: '/experience/detail/:id', // 读书书评
    name: 'experience/detail',
    component: () => import('@/views/Experience/detail.vue')
  },
  {
    path: '/study-data/index', // 学习资料
    name: 'study-data/index',
    component: () => import('@/views/StudyData/index.vue')
  },
  {
    path: '/study-data/study', // 学习资料-政协书屋
    name: 'study-data/study',
    component: () => import('@/views/StudyData/cppccStudy.vue')
  },
  {
    path: '/study-data/search', // 学习资料-搜索
    name: 'study-data/search',
    component: () => import('@/views/StudyData/search.vue')
  },
  {
    path: '/study-data/crent', // 学习资料-近期读书
    name: 'study-data/crent',
    component: () => import('@/views/StudyData/crent.vue')
  },
  {
    path: '/study-data/recommend', // 学习资料-推荐读物
    name: 'study-data/recommend',
    component: () => import('@/views/StudyData/recommend.vue')
  },
  {
    path: '/study-data/detail/:id', // 学习资料-图书详情
    name: 'study-data/detail',
    component: () => import('@/views/StudyData/detail.vue')
  },
  {
    path: '/study-data/add-recommend', // 学习资料-新增委员推荐
    name: 'study-data/add-recommend',
    component: () => import('@/views/StudyData/addRecommend.vue')
  },
  {
    path: '/study-data/recommend/detail/:id', // 学习资料-推荐详情
    name: 'study-data/recommend/detail',
    component: () => import('@/views/StudyData/recommendDetail.vue')
  },
  {
    path: '/study-data/new', // 最新书籍
    name: 'study-data/new',
    component: () => import('@/views/StudyData/newList.vue')
  }
]
