<template>
  <Layout
    title="读书动态详情"
    :is-padding="false"
  >
    <template #header />
    <div class="detail-box">
      <p class="title">
        {{ data.title }}
      </p>
      <p class="time">
        <span>{{ data.pubUnitName }}</span>
      </p>
      <div
        class="detail ck-content"
        v-html="data.content"
      />
      <FileList
        style="margin-top:20px"
        :id="id"
        v-if="id"
      />
    </div>
  </Layout>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { dynamicDetail } from '@/api/experience'
import FileList from '@/components/FileList/index.vue'
// 获取详情
const route = useRoute()
const data = reactive({
  title: '',
  content: '',
  pubDate: '',
  docType: '',
  pubUnitName: ''
})
const id: string = route.params.id as string
dynamicDetail(id).then(res => {
  Object.assign(data, res)
})
// const type = ['', '报告', '讲话', '解读', '政策']
</script>

<style lang="scss" scoped>
.detail-box {
  background-color: #fff;
  padding: $padding-md;
  min-height: 100%;

  .title {
    font-size: .22rem;
    color: $text-color;
  }
}

.time {
  margin-top: 15px;
  margin-bottom: 25px;

  span {
    font-size: $font-size-14px;
    color: $text-color-gary2;
    margin-right: 18px;

    img {
      width: 14px;
      vertical-align: text-top;
      margin-right: 4px;
    }
  }
}

.detail {
  margin-top: 16px;
}
</style>
