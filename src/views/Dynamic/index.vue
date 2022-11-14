<template>
  <Layout
    title="读书动态"
    :is-padding="false"
  >
    <template #search>
      <form
        action=""
        style="width: 100%;"
      >
        <van-search
          v-model="form.keywords"
          placeholder="搜索"
          @search="search"
        />
      </form>
    </template>
    <List
      ref="listDom"
      @get="getList"
    >
      <template #default="{item}">
        <div
          class="database-item"
          @click="goDetail(item.id)"
        >
          <div class="info">
            <p class="van-hairline--bottom">
              读书动态
            </p>
            <p class="van-hairline--bottom van-multi-ellipsis--l2">
              {{ item.title }}
            </p>
            <p>
              <span>{{ item.pubUnitName }}</span>
              <span>{{ item.pubDate }}</span>
            </p>
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
import { useStore } from '@/store'
import { useList } from '@/components/List/useList'
import { dynamicPage } from '@/api/experience'
// import Cover from '@/components/Book/cover.vue'
const sotre = useStore()
sotre.commit('addInclude', 'crentList')
const router = useRouter()
const form = reactive({
  // 搜索
  keyName: '',
  keywords: '',
  order: true,
  pageNum: 1,
  pageSize: 10,
  queryDTO: {},
  sort: ''
})

const listDom = useList()
const getList = async function (pageNum: number, cb: listFunc) {
  form.pageNum = pageNum
  const res = await dynamicPage(form)
  cb(res.records, res.total)
}

const goDetail = (id: string): void => {
  router.push({
    path: `/dynamic/detail/${id}`,
    query: {}
  })
}
const search = function () {
  listDom.value?.onRefresh()
}
</script>

<style lang="scss" scoped>
:deep(.van-tabs__content){
  display: none;
}
.van-tabs{
  height: auto;
}
:deep(.van-list){
  padding: 4px;
}
.database-item{
  padding: $padding-md;
  background-color: #fff;
  margin: 12px;
  border-radius: 3px;
  p{
    &:nth-of-type(1){
      font-size: $font-size-14px;
      color: $text-color-gary2;
      padding-bottom: 6px;
    }
    &:nth-of-type(2){
      margin-top: 6px;
      font-size: $font-size-16px;
      color: $text-color;
      padding-bottom: 8px;
      margin-bottom: 6px;
    }
    &:nth-of-type(3){
      font-size: $font-size-12px;
      color: $text-color-gary2;
      span{
        margin-right: 20px;
      }
    }
  }
}
:deep(.content-box){
  display: flex;
  flex-direction: column;
}
</style>
