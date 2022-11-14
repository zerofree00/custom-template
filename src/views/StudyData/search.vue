<template>
  <Layout
    title="书籍搜索"
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
          @clear="clear"
        />
      </form>
    </template>
    <div
      v-show="!showList"
      class="record"
    >
      <p class="cell-title">
        <i />
        <span>历史记录</span>
      </p>
      <van-icon
        @click="clearHistory"
        name="delete-o"
      />
      <ul>
        <li
          v-for="(item,index) in searchHistory"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="list-box">
      <p>搜索到 <span style="color: red;">{{ totle }}</span> 本相关书籍</p>
      <List
        ref="listDom"
        @get="getList"
        v-show="showList"
      >
        <template #default="{item}">
          <Item
            @click="goDetail(item.id)"
            :data="item"
          />
        </template>
      </List>
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, reactive, ref, watch } from 'vue'
import List from '@/components/List/index.vue'
import { useRouter } from 'vue-router'
import { useList } from '@/components/List/useList'
import { bookSearch } from '@/api/experience'
import Item from './item.vue'
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
const showList = ref(false)
const totle = ref(0)
const search = function () {
  showList.value = true
  listDom.value?.onRefresh()
}
const clear = function () {
  showList.value = false
}
watch(() => form.keywords, () => {
  console.log(form.keywords)
  if (!form.keywords) {
    showList.value = false
  }
})
const getList = async function (pageNum: number, cb: listFunc) {
  if (!form.keywords) {
    showList.value = false
    return
  }
  searchHistory.value.unshift(form.keywords)
  searchHistory.value = Array.from(new Set(searchHistory.value))
  form.pageNum = pageNum
  const res = await bookSearch(form)
  cb(res.records, res.total)
  totle.value = res.total
}

const goDetail = (id:string) :void => {
  router.push({
    path: `/study-data/detail/${id}`,
    query: {

    }
  })
}
const searchHistory = ref<Array<string>>([])
searchHistory.value = JSON.parse(localStorage.getItem('searchHistory') || '[]')
onBeforeUnmount(() => {
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
})
const clearHistory = function () {
  searchHistory.value = []
}

</script>

<style lang="scss" scoped>
.record{
  height: 100%;
  background-color: #fff;
  padding: $padding-md;
  position: relative;
  ul{
    margin-top: 14px;
    li{
      display: inline-block;
      font-size: $font-size-16px;
      color: $text-color-gary1;
      line-height: 36px;
      padding: 0 15px;
      border-radius: 3px;
      background-color: rgba(245, 245, 245, 1);
      margin-right: 15px;
      margin-bottom: 15px;
    }
  }
  .van-icon-delete-o{
    position: absolute;
    top: 12px;
    right: 14px;
    color: rgba(204, 204, 204, 1);
    font-size: 20px;
  }
}
:deep(.van-list){
  background-color: #fff;
  padding: 12px;
}
.list-box{
  >p{
    padding: 12px;
    background-color: #fff;
    padding-bottom: 0px;
  }
}
</style>
