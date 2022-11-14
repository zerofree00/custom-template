<template>
  <Layout
    title="政协书屋"
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
          @click="$router.push('./search')"
        />
      </form>
    </template>
    <div class="zxsw">
      <div @click="$router.push('./study')">
        <img
          src="@/assets/images/zxsw1.png"
          alt=""
        >
        <div>
          <p>政协书屋</p>
          <p>{{ count }}本书籍</p>
        </div>
      </div>
      <div @click="go">
        <img
          src="@/assets/images/zxsw2.png"
          alt=""
        >
        <div>
          <p>多媒体书屋</p>
          <p>10000+本书籍</p>
        </div>
      </div>
    </div>
    <van-cell
      :value="historyList.length?'更多':''"
      :is-link="!!historyList.length"
      :to="'./crent'"
      class="book"
    >
      <template #title>
        <p class="cell-title">
          <i />
          <span>近期读书</span>
        </p>
      </template>
    </van-cell>
    <ul class="book-list">
      <Empty v-if="historyList.length === 0" />
      <li
        v-for="item in historyList"
        :key="item.id"
      >
        <div>
          <Cover :url="item.bookCover" />
          <p class="van-multi-ellipsis--l2">
            {{ item.bookName }}
          </p>
        </div>
      </li>
    </ul>
    <van-cell
      style="padding-bottom:0px"
      :value="list.length?'更多':''"
      :is-link="!!list.length"
      :to="'./recommend'"
      class="book"
    >
      <template #title>
        <p class="cell-title">
          <i />
          <span>推荐读物</span>
        </p>
      </template>
    </van-cell>
    <div class="experience-list-box">
      <Empty v-if="list.length === 0" />
      <div
        v-for="item in list"
        :key="item.id"
        class="experience-item van-hairline--bottom"
      >
        <Item
          is-author
          is-recommend
          @click="goRecommendDetail(item.id)"
          :data="item"
        />
      </div>
    </div>
  </Layout>
</template>

<script lang="ts" setup name="study-data-index">
import { onActivated, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { recommendPage, recentStudyPage, bookSearch } from '@/api/experience'
import Item from './item.vue'
import Cover from '@/components/Book/cover.vue'
// import { openUrl } from '@/utils/utils'
import Empty from '@/components/Empty/index.vue'
import { Toast } from 'vant'
const sotre = useStore()
sotre.commit('deleteInclude', 'groupAdd')
sotre.commit('addInclude', 'study-data-index')

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
const list = ref<Array<any>>([])
const count = ref(0)
const historyList = ref<Array<any>>([])

const init = function () {
  recommendPage(form).then(res => {
    list.value = res.records
  })
  bookSearch(form).then((res) => {
    count.value = res.total
  })
  recentStudyPage({
    keyName: '',
    keywords: '',
    order: true,
    pageNum: 1,
    pageSize: 4,
    queryDTO: {
    },
    sort: ''
  }).then(res => {
    historyList.value = res.records
  })
}
onActivated(() => {
  init()
})

const goRecommendDetail = (id:string) :void => {
  router.push({
    path: `/study-data/recommend/detail/${id}`,
    query: {

    }
  })
}

const go = function () {
  Toast('暂未接入多媒体书屋')
  // https://oauth.bookan.com.cn/api/oauth?authType=1&serverType=2&id=xxx&userName=xxx&sign=xxx
  // getLibraryUrl().then(res => {
  //   openUrl({
  //     url: res[0],
  //     type: 1
  //   })
  // })
}

</script>

<style lang="scss" scoped>
.experience-list-box{
  // height: 100%;
  padding: $padding-md;
  background-color: #fff;
  overflow-y: auto;
  padding-top: 0;
}
:deep(.components-list-box){
  height: auto;
  min-height:calc(100% - 160px)

}
:deep(.van-pull-refresh){
  overflow: visible;
}

//近期读书
.book-list{
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 12px;
  padding-top: 0;
  margin-bottom: 12px;
  li{
    width:25%;
    padding: 0 5px;
    // margin-right: 4%;
    &:nth-of-type(4){
      margin-right: 0;
    }
    p{
      text-align: center;
    }
  }
}
.book{
  margin-top: 12px;
  &::after{
    display: none;
  }
}
.zxsw{
  background-color: #fff;
  margin-top: 12px;
  >div{
    width: 50%;
    display: inline-flex;
    padding: 16px;

    img{
      width: 46px;
      height: 46px;
    }
    p{
      margin-left: 7px;
      &:nth-of-type(1){
        font-size:.2rem;
        color: $text-color;
        font-weight: bold;
        line-height: 1;
        margin-bottom: 7px;
        margin-top: 4px;
      }
      &:nth-of-type(2){
        font-size:.13rem;
        color: rgba(145, 145, 145, 1);
      }
    }
    &:nth-of-type(2){
      position: relative;
      &::before{
        content: '';
        width: 1px;
        height: 38px;
        background-color:rgba(236, 236, 236, 1);
        position: absolute;
        left: 0;
        top: 20px;
      }
    }
  }
}
</style>
