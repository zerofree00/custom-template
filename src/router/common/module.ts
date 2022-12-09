// import { RouteRecordRaw } from 'vue-router'
export default [
  {
    path: '/333/index', // 读书动态
    name: '333/index',
    component: () => import('@/views/Dynamic/index.vue')
  }
  // {
  //   path: '/dynamic/detail/:id', // 读书动态详情
  //   name: 'dynamic/detail',
  //   component: () => import('@/views/Dynamic/detail.vue')
  // },
  // {
  //   path: '/dynamic/add', // 读书动态新增
  //   name: 'dynamic/add',
  //   component: () => import('@/views/Dynamic/add.vue')
  // },
]
