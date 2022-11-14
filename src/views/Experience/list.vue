<template>
  <Layout
    title="悦读分享"
    :is-padding="false"
  >
    <div class="experience-list-box">
      <List
        ref="listDom"
        @get="getList"
      >
        <!--        <template #top>
          <div class="banner">
            <img
              src="@/assets/images/index/hb.jpg"
              alt="辽宁书香政协"
            >
          </div>
        </template>-->
        <template #default="{item}">
          <Item :item="item" />
        </template>
      </List>
    </div>
  </Layout>
</template>

<script lang="ts" setup name="experienceList">
import Item from './item.vue'
import { reactive } from 'vue'
import List from '@/components/List/index.vue'
import { useStore } from '@/store'
import { useList } from '@/components/List/useList'
import { experiencePage } from '@/api/experience'
const sotre = useStore()
sotre.commit('addInclude', 'experienceList')

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
  const res = await experiencePage(form)
  cb(res.records, res.total)
}
</script>

<style lang="scss" scoped>
.experience-list-box{
  height: 100%;
  padding: $padding-md;
  background-color: #fff;
  overflow-y: auto;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
}
.banner{
  // position: absolute;
  // top: 12px;
  // left: 12px;
  // right: 12px;
}
:deep(.components-list-box){
  height:100%;
  // min-height:calc(100% - 160px)
  // .van-pull-refresh__track{
  //   padding-top: 160px;
  // }
  .van-list{
    //  padding-top: 160px;
  }
}
:deep(.van-pull-refresh){
  overflow: visible;
}
.experience-item{
  display: flex;
  padding: 10px 0;
  .img{
    width: 70px;
    flex-shrink: 0;
    margin-right: 12px;
  }
  .info{
    p:nth-of-type(1){
      font-size: $font-size-16px;
      color: $text-color;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
    p:nth-of-type(2){
      font-size: $font-size-14px;
      color: $text-color-gary2;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      margin-top: 10px;
      margin-bottom: 8px;
      line-height: 1.5;
    }
    p:nth-of-type(3){
      span{
        font-size: $font-size-12px;
        color: $text-color-gary2;
        margin-right: 18px;
        img{
          width: 11px;
          vertical-align: text-top;
          margin-right: 3px;
        }
      }
    }
  }
}
</style>
