import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'

const routes2 = Object.assign([], routes)

/** ************  自动注册'./common'文件夹下所有以'.ts'结尾的文件  *************************/
const modulesFiles = import.meta.globEager('./common/*.ts')
console.log('modulesFiles==', modulesFiles)
Object.keys(modulesFiles).forEach((modules) => {
  // @ts-ignore
  const config = modulesFiles[modules]
  // console.log('config.default==', config.default)
  if (config.default) {
    routes2.push(...config.default)
  }
})
/** ************  自动注册'./common'文件夹下所有以'.vue'结尾的组件  *************************/

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes2
})

export default router
