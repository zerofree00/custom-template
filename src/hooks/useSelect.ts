import { reactive } from 'vue'
import { getParamList } from '@/api/index'

interface ParamItem {
    easyName: string
    id: string
    paramCode: string
    paramName: string
    sort:number
    state: number
}
interface cbFunc {
  (id:any): void;
}

interface getMapCb {
  (): Promise<Array<optionItem>>
}
// 用于缓存的map 集合
const map = new Map()
/**
 * 获取map集合中的缓存数据
 * @param key map的key
 * @param fn 接收一个Promise的异步函数  函数返回值为Array<optionItem>的数据
 * @param successCb 获取到数据之后的回调函数，传入获取到的第一个value
 * @returns 返回获取到的值，没有获取到则调用回调函数从接口中获取
 */
const getMap = function (key:string, fn:getMapCb, successCb:cbFunc = () => { }) {
  const option:Array<optionItem> = reactive([])
  const mapKey = key
  if (map.has(mapKey)) {
    option.push(...map.get(mapKey))
    successCb(option[0].value)
  } else {
    fn().then(res => {
      option.push(...res)
      successCb(option[0].value)
      map.set(key, option)
    })
  }
  return option
}

/**
 * 通过接口获取数据字典的数据，优先从map缓存中获取
 * @param typeName 数据字典需要的参数
 * @returns 返回获取到的值
 */
export const getParam = (typeName:string):Array<optionItem> => {
  const mapKey = 'getParam' + typeName
  return getMap(mapKey, () => {
    return getParamList(
      typeName
    ).then((res: Array<ParamItem>) => {
      return res.map(e => {
        return {
          text: e.easyName,
          value: e.paramCode
        }
      })
    })
  })
}
