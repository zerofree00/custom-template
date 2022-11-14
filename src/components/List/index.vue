<template>
  <div class="components-list-box">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        @load="onLoad"
      >
        <slot name="top" />
        <slot
          :item="item"
          v-for="item in list"
          :key="item.id"
          :title="item"
        />
        <template #finished>
          <empty v-if="list.length === 0" />
          <p v-else>
            没有更多了
          </p>
        </template>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script setup lang="ts" name="List">
import { ref } from 'vue'
import Empty from '../Empty/index.vue'

const emit = defineEmits<{(e: 'get', pageNum:number, cb:listFunc): void}>()

const list = ref<Array<any>>([{
  title: '锦州市政协王鹤松《粮食安全干部读本》读书体会',
  name: '昂委员',
  time: '2022-08-05',
  photo: 'https://img01.yzcdn.cn/vant/cat.jpeg',
  content: '读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享'
}, {
  title: '锦州市政协王鹤松《粮食安全干部读本》读书体会',
  name: '昂委员',
  time: '2022-08-05',
  photo: 'https://img01.yzcdn.cn/vant/cat.jpeg',
  content: '读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享'
}, {
  title: '读写讯息的信贷分享',
  name: '昂委员',
  time: '2022-08-05',
  photo: 'https://img01.yzcdn.cn/vant/cat.jpeg',
  content: '读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享'
}, {
  title: '读写讯息的信贷分享',
  name: '昂委员',
  time: '2022-08-05',
  photo: 'https://img01.yzcdn.cn/vant/cat.jpeg',
  content: '读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享'
}])
const loading = ref<boolean>(false)
const finished = ref<boolean>(false)
const refreshing = ref<boolean>(false)
const pageNum = ref(1)

const cb = function (records:Array<any>, total:number):void {
  if (refreshing.value) {
    list.value = []
    refreshing.value = false
  }
  if (pageNum.value === 1) {
    list.value = records
  } else {
    list.value.push(...records)
  }
  pageNum.value++
  loading.value = false

  if (list.value.length >= total) {
    finished.value = true
  }
}
/**
 * 抛出load事件，使用者传入数据即可
 */
const onLoad = () => {
  emit('get', pageNum.value, cb)
}
/**
 * 手动触发下拉刷新 没有动画
 */
const onRefresh = () => {
  // 清空列表数据
  finished.value = false
  pageNum.value = 1
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}
defineExpose({
  onRefresh
})
</script>

<style lang="scss" scoped>
.components-list-box{
  height: 100%;
  height: 100%;
  overflow:hidden;
  overflow-y: auto;
  flex-shrink: 1;
  flex-grow:2;
  &::-webkit-scrollbar {
    display: none;
  }
}
.van-pull-refresh{
  min-height: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  :deep(.van-pull-refresh__track){
    min-height: 100%;
    height: 100%;
    flex-grow: 1;
  }
}
</style>
