import { ref } from 'vue'
const arr: Array<(h: number) => void> = []
/**
 *
 * @param h 移动端传来的键盘高度
 */
// @ts-ignore//
window.setKeyboardHeight = function (h: number) {
  arr.forEach((e) => { // 发布事件
    e(h)
  })
}
export const keyboardHeight = () => {
  const inputBottom = ref(0)
  const messageField = ref()
  arr.push(function (h) { // 订阅事件
    inputBottom.value = h
  })
  const focus = () => {
    messageField.value.focus()
  }
  const resetInputBottom = () => {
    inputBottom.value = 0
  }

  return {
    inputBottom,
    focus,
    messageField,
    resetInputBottom
  }
}
