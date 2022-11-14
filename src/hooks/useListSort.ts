import { Page } from '@/api/interface/index'
interface SortFunc {
  (val: string): void;
}
interface cbFunc {
  (): void;
}
/**
 * 处理page接口排序的方法
 * @param form page接口的参数
 * @param cb 修改完排序参数的回调
 * @returns 用于修改排序的change方法 该函数的接收change的值
 */
export const changeSort = (form: Page, cb:cbFunc = () => {}):SortFunc => {
  const fn = function (val: string): void {
    if (val) {
      const [sort, order] = val.split(',')
      form.sort = sort
      form.order = (order === 'true')
    } else {
      form.sort = ''
      form.order = true
    }
    cb()
  }
  return fn
}
