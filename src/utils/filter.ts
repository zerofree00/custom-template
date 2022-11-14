// import { App } from 'vue'
import { staticData, StaticDataItem } from './static'
// export default function (app: App<Element>) {
//   app.config.globalProperties.$filters = {
//     whether (val:number | null):string {
//       return val ? '是' : '否'
//     },
//     unitName (val: Array<string> | string): string {
//       const arr = Array.isArray(val) ? val : val.split(',')
//       return arr.map(e => e.split('/')[1]).join()
//     }
//   }
// }

/**
 * 1是 0否  通过数字转换成文字 是 否
 * @param 需要转换的值
 * @returns 是 or 否
 */
export const whether = function (val:number | null | undefined):string {
  return val ? '是' : '否'
}

/**
 * 把 id/name 的数据转换成 name
 * @param val 接收 单个string逗号分隔，接收 id/name 类型的string数组
 * @returns 遍历后的name数据 逗号分隔
 */
export const unitName = function (val: Array<string> | string | undefined | null): string {
  if (val === undefined || val === null) return ''
  const arr = Array.isArray(val) ? val : val.split(',')
  return arr.map(e => e.split('/')[1]).join()
}

/**
 * 把输入的val通过该方法获取到对应的text值
 * @param val 需要转换的值
 * @param staticArr 遍历的数组，如果传入的是string 则从staticData里获取数组，传入数组则直接使用该数组
 * @returns 返回从数组里面找到对应的text 没有则返回 '-'
 */
export const getText = function (val: string | number, staticArr: Array<StaticDataItem> | string): string {
  const arr = Array.isArray(staticArr) ? staticArr : staticData[staticArr]
  let res = ''
  arr.forEach((e:StaticDataItem) => {
    // 通过value 找到 selectOption 的text
    if (e.value === val) {
      res += e.text
    }
  })
  return res || '-'
}

/**
 * 把输入的val通过该方法获取到对应的text值 可以获取多个text 空格分隔
 * @param val 需要转换的值 逗号分隔
 * @param staticArr 遍历的数组，如果传入的是string 则从staticData里获取数组，传入数组则直接使用该数组
 * @returns 返回从数组里面找到对应的多个text 没有则返回 '-'
 */
export const getTextArr = function (val: string, staticArr: Array<StaticDataItem> | string): string {
  const arr = Array.isArray(staticArr) ? staticArr : staticData[staticArr]
  let res = ''
  if (val) {
    const valArr = val.split(',')
    arr.forEach((e:StaticDataItem) => {
      // 通过value 找到 selectOption 的text
      if (valArr.includes(e.value as string)) {
        res += ` ${e.text}`
      }
    })
  }

  return res || '-'
}
/**
 * 输入对应状态编码 返回该状态在html中展示的颜色
 * @param val 状态编码
 * @param staticArr 遍历的数组，如果传入的是string 则从staticData里获取数组，传入数组则直接使用该数组
 * @returns 返回从数组里面找到对应的状态颜色 没有则返回 '#1890FF'
 */
export const getColor = function (val: string | number, staticArr: Array<StaticDataItem> | string): string {
  const arr = Array.isArray(staticArr) ? staticArr : staticData[staticArr]
  let res = '-'
  arr.forEach((e:StaticDataItem) => {
    // 通过value 找到 selectOption 的text
    if (e.value === val) {
      res = e.color || '#1890FF'
    }
  })
  return res
}
