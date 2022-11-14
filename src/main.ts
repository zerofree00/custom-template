import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { store, key } from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import components from './components'
import '@/styles/index.scss'
import VConsole from 'vconsole'
// import initFilter from '@/utils/filter'
const app = createApp(App)
// 组件注册
for (const key in components) {
  app.component(String(components[key].name), components[key])
}
if (import.meta.env.DEV) {
// eslint-disable-next-line no-unused-vars
  const vConsole = new VConsole()
}

// 过滤器注册
// initFilter(app)
app.use(Vant)
app.use(store, key)
app.use(router)
app.mount('#app')
