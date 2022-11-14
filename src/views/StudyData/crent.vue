<template>
  <Layout
    title="近期读书"
    :is-padding="false"
  >
    <List
      ref="listDom"
      @get="getList"
    >
      <template #default="{item}">
        <div
          class="item"
          @click="goDetail(item.bookId)"
        >
          <Cover
            style="margin-bottom:6px"
            :url="item.bookCover"
          />
          <p class="name van-multi-ellipsis--l2">
            {{ item.bookName }}
          </p>
          <div class="progress">
            <van-progress :percentage="parseFloat(item.readPercent)" />
            <span>{{ item.readPercent }}%</span>
          </div>
        </div>
      </template>
    </List>
  </Layout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import List from '@/components/List/index.vue'
import { useRouter } from 'vue-router'
// import { useStore } from '@/store'
import { useList } from '@/components/List/useList'
import { recentStudyPage } from '@/api/experience'
import Cover from '@/components/Book/cover.vue'
// const sotre = useStore()
// sotre.commit('addInclude', 'crentList')
const router = useRouter()
const form = reactive({ // 搜索
  keyName: '',
  keywords: '',
  order: true,
  pageNum: 1,
  pageSize: 10,
  queryDTO: {
  },
  sort: ''
})
const listDom = useList()
const getList = async function (pageNum: number, cb: listFunc) {
  form.pageNum = pageNum
  const res = await recentStudyPage(form)
  cb(res.records, res.total)
}

const goDetail = (id:string) :void => {
  router.push({
    path: `/study-data/detail/${id}`,
    query: {

    }
  })
}

</script>

<style lang="scss" scoped>
.item{
  width: 30%;
  display: inline-block;
  margin-bottom: 20px;
  height: 190px;
  &:nth-of-type(3n - 1){
    margin: 0 5%;
  }
  .name{
    font-weight: bold;
    font-size: $font-size-12px;
    height: 28px;
    line-height: 14px;
  }
}
:deep(.van-list){
  background-color: #fff;
  padding: 20px;
}
:deep(.van-progress__pivot){
  display:none;
}
.progress{
  display: flex;
  align-items: center;
  .van-progress{
    width: 100%;

  }
  span{
    font-size: .08rem;
    color: rgba(242, 52, 52, 1);
    flex-shrink: 0;
    margin-left: 6px;
  }
}
</style>
