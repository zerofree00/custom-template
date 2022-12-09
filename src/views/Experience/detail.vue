<template>
  <Layout
    title="读书体会"
    :is-padding="false"
  >
    <template #header />
    <div class="detail-box">
      <p class="title">
        {{ data.title }}
      </p>
      <p class="time">
        <span><img
          src="@/assets/images/user-icon.png"
          alt=""
        >{{ data.pubUserName }}</span>
        <span><img
          style="margin-top: 2px;"
          src="@/assets/images/time-icon.png"
          alt=""
        >{{ data.pubDate }}</span>
      </p>
      <div
        class="detail ck-content"
        v-html="data.content"
      />
      <ReplyList />
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { experienceDetail } from '@/api/experience'
import ReplyList from './reply/list.vue'
// 获取详情
const route = useRoute()
const data = reactive({
  title: '',
  content: '',
  name: '',
  pubUserName: '',
  pubDate: ''
})
const id:string = route.params.id as string
experienceDetail(id).then(res => {
  Object.assign(data, res)
})
</script>

<style lang="scss" scoped>
:deep .ck-content table{
  width:100%!important;
}
.detail-box{
  background-color: #fff;
  padding:$padding-md;
  min-height: 100%;
  padding-bottom:50px;
  .title{
    font-size: .22rem;
    color: $text-color;
  }
}
.time{
  margin-top: 15px;
  margin-bottom: 25px;
  span{
    font-size: $font-size-14px;
    color: $text-color-gary2;
    margin-right: 18px;
    img{
      width: 14px;
      vertical-align: text-top;
      margin-right: 4px;
    }
  }
}
.detail{
  margin-top: 16px;
}
</style>
