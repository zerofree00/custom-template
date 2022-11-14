<template>
  <Layout
    title="最新书籍"
    :is-padding="false"
  >
    <template #header />
    <List
      ref="listDom"
      @get="getList"
    >
      <template #default="{item}">
        <Item
          @click="goDetail(item.id)"
          :data="item"
          is-author
          is-recommend
        />
      </template>
    </List>
  </Layout>
</template>

<script lang="ts" setup name="newList">
import { reactive } from 'vue'
import List from '@/components/List/index.vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { useList } from '@/components/List/useList'
import { bookSearch } from '@/api/experience'
import Item from './item.vue'
const sotre = useStore()
sotre.commit('addInclude', 'newList')
const router = useRouter()
const form = reactive({ // 搜索
  keyName: '',
  keywords: '',
  order: true,
  pageNum: 1,
  pageSize: 10,
  queryDTO: {
    isRecommend: -1
  },
  sort: ''
})
const listDom = useList()
const getList = async function (pageNum: number, cb: listFunc) {
  form.pageNum = pageNum
  const res = await bookSearch(form)
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
:deep(.van-list){
  background-color: #fff;
  padding: 12px;
}
</style>
