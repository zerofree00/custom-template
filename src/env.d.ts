/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
// 配置环境变量接口
// eslint-disable-next-line no-unused-vars
interface ImportMetaEnv {
  readonly VITE_API_BASEURL: string
  readonly VITE_API_UPMSURL: string
  readonly VITE_CRYPTOKEY: string
  readonly VITE_CRYPTOIV: string
  // 更多环境变量...
}

// eslint-disable-next-line no-unused-vars
interface listFunc {
  (records:Array<any>, total:number): void;
}

interface optionItem {
  text: string,
  value: string | number
}
