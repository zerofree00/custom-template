import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vietEslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vietEslintPlugin({
      // 提示在项目运行时代码编写不规范，代码编写跟项目构建都能起到效果
      cache: false
    }),
    VueSetupExtend(), // setup 支持name属性
    vueJsx({}) // jsx、tsx支持
  ],
  resolve: {
    // 配置别名
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },
  css: {
    // 全局样式处理
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  },
  server: {
    proxy: {
      // 选项写法
      '/apis': {
        // target: 'http://192.168.1.50:8888', // 代理目标地址
        target: 'http://221.180.204.131:8070/', // 代理目标地址
        changeOrigin: true, // 代理基于名字的虚拟主机，代理服务会把origin修改为目标地址
        rewrite: path => path.replace(/^\/apis/, '') // 路径重写
      },
      '/upms': {
        // target: 'http://192.168.1.50:6767', // 代理目标地址
        target: 'http://221.180.204.131:8060/', // 代理目标地址
        changeOrigin: true, // 代理基于名字的虚拟主机，代理服务会把origin修改为目标地址
        rewrite: path => path.replace(/^\/upms/, '') // 路径重写
      }
    },
    host: '0.0.0.0',
    port: 8992,
    // 是否开启 https
    https: false
  }
})
