import { ref, Ref, onActivated } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { ListRef } from '../interface'

// 记录被缓存的list组件当前滚动高度
// 返回 list的refs
export const useList = function ():Ref<ListRef | null> {
  const listDom = ref<ListRef | null>(null)
  let top = 0
  onActivated(() => {
    console.log('1111--', listDom)
    if (listDom.value) {
      listDom.value!.$el.scrollTop = top
    }
  })

  onBeforeRouteLeave(() => {
    top = listDom.value?.$el.scrollTop || 0
  })
  return listDom
}
