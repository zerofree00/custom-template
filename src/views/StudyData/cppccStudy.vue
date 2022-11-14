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
          placeholder="搜索"
          @click="$router.push('./search')"
        />
      </form>
    </template>
    <div class="hot">
      <p class="cell-title">
        <i />
        <span>热门书籍</span>
      </p>
      <Empty v-if="hot.length === 0" />
      <div class="hot-list">
        <div
          v-if="hot[1]"
          class="hot-2"
          @click="goDetail(hot[1].id)"
        >
          <Cover :url="hot[1].cover" />
          <div class="count">
            <p>{{ hot[1].name }}</p>
          </div>
        </div>
        <div
          v-if="hot[0]"
          class="hot-1"
          @click="goDetail(hot[0].id)"
        >
          <Cover :url="hot[0].cover" />
          <div class="count">
            <p>{{ hot[0].name }}</p>
          </div>
        </div>
        <div
          v-if="hot[2]"
          class="hot-3"
          @click="goDetail(hot[2].id)"
        >
          <Cover :url="hot[2].cover" />
          <div class="count">
            <p>{{ hot[2].name }}</p>
          </div>
        </div>
      </div>
    </div>

    <van-cell
      :value="newList.length?'更多':''"
      :is-link="!!newList.length"
      :to="'/study-data/new'"
      class="book"
    >
      <template #title>
        <p class="cell-title">
          <i />
          <span>最新书籍</span>
        </p>
      </template>
    </van-cell>
    <ul class="book-list">
      <Empty v-if="newList.length === 0" />
      <li
        v-for="item in newList"
        :key="item.id"
        @click="goDetail(item.id)"
      >
        <div>
          <Cover :url="item.cover" />
          <p>{{ item.name }}</p>
        </div>
      </li>
    </ul>
  </Layout>
</template>

<script lang="ts" setup name="cppccStudy">
import { ref } from 'vue'
import { useStore } from '@/store'
import { bookHot, bookNew } from '@/api/experience'
import Cover from '@/components/Book/cover.vue'
import { useRouter } from 'vue-router'
const sotre = useStore()
sotre.commit('addInclude', 'cppccStudy')
sotre.commit('deleteInclude', 'newList')
// 热门书籍
const hot = ref<Array<any>>([])
bookHot({
  isRecommend: -1
}).then((res) => {
  hot.value = res
})
// 最新书籍
const newList = ref<Array<any>>([])
bookNew({
  isRecommend: -1
}).then((res) => {
  newList.value = res
})
const router = useRouter()
const goDetail = (id:string) :void => {
  router.push({
    path: `/study-data/detail/${id}`,
    query: {

    }
  })
}

</script>

<style lang="scss" scoped>

:deep(.components-list-box){
  height: auto;
  min-height:calc(100% - 160px)

}
:deep(.van-pull-refresh){
  overflow: visible;
}
//最新书籍
.book-list{
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 12px;
  padding-top: 0;
  .cover{
    margin-bottom: 6px;
  }
  li{
    width:30%;
    &:nth-of-type(3n-1){
      margin:0 5%
    }
    p{
      text-align: center;
      font-size: $font-size-12px;
      height: 38px;
      line-height: 14px;
    }
  }
}
.book{
  &::after{
    display: none;
  }
}

//热门书籍
.hot{
  margin-top: 12px;
  background-color: #fff;
  padding: 12px;
  padding-bottom: 0;
  .hot-list{
    display: flex;
    justify-content: space-between;
    .cover{
      margin-bottom: 6px;
    }
    >div{
      width: 28%;
      .count{
        padding: 7px;
        text-align: center;
        font-size: $font-size-12px;
        color: rgba(68, 68, 68, 1);
      }
    }
    .hot-2{
      margin-top: 20px;
      .count{
        width: 100%;
        height: 77px;
        background: url('@/assets/images/top2.png') center / 100% no-repeat;
      }
    }
    .hot-1{
      .count{
        width: 100%;
        height: 109px;
        background: url('@/assets/images/top1.png') center / 100% no-repeat;
      }
    }
    .hot-3{
      margin-top: 20px;
      .count{
        width: 100%;
        height: 77px;
        background: url('@/assets/images/top3.png') center / 100% no-repeat;
      }
    }
  }
}
</style>
