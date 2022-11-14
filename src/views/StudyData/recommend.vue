<template>
  <Layout
    title="好书推荐"
    :is-padding="false"
  >
    <!--    <template #header>-->
    <!--      <span-->
    <!--        @click="$router.push('./add-recommend')"-->
    <!--        class="zysq"-->
    <!--      >我要荐书</span>-->
    <!--    </template>-->
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

<script lang="ts" setup name="recommendList">
import { reactive } from 'vue'
import List from '@/components/List/index.vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { useList } from '@/components/List/useList'
import { recommendPage } from '@/api/experience'
import Item from './item.vue'
const sotre = useStore()
sotre.commit('addInclude', 'recommendList')
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
  const res = await recommendPage(form)
  cb(res.records, res.total)
}

const goDetail = (id:string) :void => {
  router.push({
    path: `/study-data/recommend/detail/${id}`,
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
.zysq{
  border: 1px solid rgba(28, 101, 230, 1);
  color: rgba(28, 101, 230, 1);
  font-size: 13px;
  width: 68px;
  height: 22px;
  line-height: 22px;
  border-radius: 4px;
}
</style>
