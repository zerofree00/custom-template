<template>
  <Layout
    title="推荐读物"
    :is-padding="false"
  >
    <template #header />
    <div class="detail-box">
      <p class="title">
        {{ data.bookName }}
      </p>
      <p class="time">
        <span>推荐人：{{ data.recommendUserName }}</span> <span>时间：{{ data.recommendDate }}</span>
      </p>
      <div
        class="detail"
        v-html="data.bookProfile"
      />

      <div class="item-box">
        <p class="cell-title">
          <i />
          <span>推荐读物</span>
        </p>
        <Item
          @click="goDetail(data.bookId)"
          :data="{...data,bookProfile:data.bookProfileTxt}"
          is-author
        />
      </div>
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { recommendDetail } from '@/api/experience'
import Item from './item.vue'
// 获取详情
const route = useRoute()
const data = reactive({
  bookAuthor: '',
  bookCover: '',
  bookName: '',
  bookProfile: '',
  bookProfileTxt: '',
  recommendDate: '',
  recommendType: '',
  recommendUserName: '',
  bookId: ''
})
const id:string = route.params.id as string
recommendDetail(id).then(res => {
  Object.assign(data, res)
})

const router = useRouter()
const goDetail = (id: string): void => {
  if (id) {
    router.push({
      path: `/study-data/detail/${id}`,
      query: {

      }
    })
  }
}
</script>

<style lang="scss" scoped>
.detail-box{
  background-color: #fff;
  padding:$padding-md;
  min-height: 100%;
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
.item-box{
  margin-top: 20px;
}
</style>
