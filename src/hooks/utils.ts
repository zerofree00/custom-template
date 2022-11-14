import { getIdApi } from '@/api'
import { Ref, ref } from 'vue'

/**
 * 组合式api 输入一个id 如果id不为空，则通过接口获取id，反之响应该id
 * @param val 输入的id
 * @returns 返回处理后的id
 */
export const useId = (val:string = ''):Ref<string> => {
  const id = ref(val)
  if (id.value === '') {
    getIdApi().then(res => {
      id.value = res
    })
  }
  return id
}

/**
 * 组合式api 判断是否处于下拉展开状态
 * @returns 返回是否处于下拉状态，以及对应的修改事件
 */
export const searchDropdown = () => {
  const opened = ref(false)
  const openedFn = function () {
    opened.value = true
  }
  const closedFn = function () {
    opened.value = false
  }
  return {
    opened,
    closedFn,
    openedFn
  }
}
