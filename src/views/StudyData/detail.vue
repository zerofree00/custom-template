<template>
  <div class="layout">
    <div
      @click="back"
      class="back"
    >
      <van-icon
        color="#fff"
        name="arrow-left"
      />
    </div>
    <div class="title">
      <div style="width:110px;margin-right: 25px;flex-shrink: 0;">
        <cover
          :url="data.cover"
        />
      </div>
      <div>
        <h5>{{ data.name }}</h5>
        <p><span>作者</span>：<span>{{ data.author }}</span></p>
        <p><span>出版社</span>：<span class="van-ellipsis">{{ data.publisher }}</span></p>
        <p><span>出版时间</span>：<span>{{ data.publisherDate }}</span></p>
      </div>
    </div>
    <div class="detail-box">
      <div class="introduce">
        <h5>简介</h5>
        <!-- {{ vall }} -->
        <p>{{ data.profile }}</p>
      </div>
      <van-cell
        class="book"
      >
        <template #title>
          <p class="cell-title">
            <i />
            <span>相关读书群</span>
          </p>
        </template>
      </van-cell>
      <Empty v-if="groupList.length === 0" />
      <ul class="book-list">
        <li
          v-for="item in groupList"
          :key="item.id"
          @click="goDetail(item.id)"
        >
          <div>
            <van-image
              fit="cover"
              position="center"
              :src="item.qdGroupPhoto"
              v-if="item.qdGroupPhoto"
            />
            <img
              v-else
              src="@/assets/images/group.png"
              alt=""
            >
            <p>{{ item.name }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer van-hairline--top">
      <div>
        <!-- 取消 -->
        <van-icon
          @click="cancel"
          color="rgba(35, 99, 225, 1)"
          name="star"
          v-show="data.isCollect"
        />
        <!-- 收藏 -->
        <van-icon
          @click="add"
          name="star-o"
          v-show="!data.isCollect"
        />
        <span>收藏</span>
      </div>
      <p @click="goBook">
        开始阅读
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { bookDetail, bookCollect, bookCollectAdd, bookRead } from '@/api/experience'
import { goAppBookDetail } from '@/utils/utils'
import Cover from '@/components/Book/cover.vue'
import bg from '@/assets/images/book-detail-bg.png'
// import { Toast } from 'vant'
const router = useRouter()
const route = useRoute()
const id:string = route.params.id as string
const initBg = function () {
  document.getElementsByTagName(
    'html'
  )[0].style.background = `#f5f6fa url('${bg}') top center / 100%  no-repeat`
}
nextTick(() => {
  initBg()
})
onUnmounted(() => {
  console.log('离开')
  document.getElementsByTagName('html')[0].style.background = ''
})

const back = function () {
  router.back()
}
const data = reactive({
  author: '',
  cover: '',
  id: '',
  isCollect: 0,
  name: '',
  profile: '',
  publisher: '',
  publisherDate: '',
  bookPath: '',
  isRecommend: 0,
  bookModule: ''
})
// 相关读书群
const groupList = ref<Array<any>>([])
bookDetail(id).then((res) => {
  Object.assign(data, res)
  groupList.value = res.bookGroupList || []
})
const add = function () {
  bookCollectAdd({
    bookId: id,
    sourceType: '1'
  }).then(() => {
    data.isCollect = 1
  })
}
const cancel = function () {
  bookCollect({
    bookId: id,
    sourceType: '1'
  }).then(() => {
    data.isCollect = 0
  })
}
// const time = ref('')
// function timestampToTime (timestamp:number) {
//   const date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
//   const Y = date.getFullYear() + '-'
//   const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
//   const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
//   const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
//   const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
//   const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
//   return Y + M + D + h + m + s
// }
const goBook = function () {
  console.log(`${import.meta.env.VITE_API_BASEURL}/sys/oss/download?module=${data.bookModule}&path=${data.bookPath}`)
  goAppBookDetail({
    bookId: id,
    // iframeUrl: `http://192.168.6.158:8888/sys/oss/download?module=${data.bookModule}&path=${data.bookPath}`,
    iframeUrl: `${import.meta.env.VITE_API_BASEURL}/sys/oss/download?module=${data.bookModule}&path=${data.bookPath}`,
    // iframeUrl: `http://192.168.6.66:8888/sys/oss/download?module=${data.bookModule}&path=${data.bookPath}`,
    bookName: data.name
  })
  // time.value = timestampToTime(new Date().getTime())
}
// const vall = ref('')
// @ts-ignore
window.getBookDataFromApp = function (val: string) {
  try {
    // vall.value = val
    const info = JSON.parse(val)
    bookRead({
      bookId: id,
      isRecommend: data.isRecommend,
      // readDate: time.value,
      readPercent: (Number(info.strBookPercent) * 100).toFixed(2),
      readTime: info.strReadTime
    })
  } catch (error) {
    // vall.value = error + ''
  }
}
const goDetail = function (id:string) {
  router.push('/group/detail/' + id)
}

</script>
<style lang="scss" scoped>
.title{
  display: flex;
  flex-shrink: 0;
  // align-items: center;
  padding:22px 18px;
  padding-top: 10px;
  // margin-top: -180px;
  color: #fff;
  h5{
    margin-bottom: 18px;
    font-size: .3rem;
    font-weight: normal;
  }
  p{
    line-height: 2;
    font-size: $font-size-14px;
    height: 28px;
    overflow: hidden;
    display: flex;
    span{
      vertical-align: top;
      display: inline-block;
      &:nth-of-type(1){
        display: inline-block;
        width: 64px;
        text-align: justify;
        flex-shrink: 0;
        &::after {
          width: 100%;
          display: inline-block;
          content: "";
        }
      }
      &:nth-of-type(2){
        display: inline-block;
      }
    }
  }
  .introduce{
    font-size: $font-size-14px;
  }
}

.footer{
  height: 54px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 6px 16px;
  padding-left: 0;
  div{
    text-align: center;
    width: 70px;
    flex-shrink: 0;
    i{
      display: block;
      font-size: 24px;
    }
  }
  p{
    color: #fff;
    background-color:rgba(28, 101, 230, 1);
    text-align: center;
    line-height: 40px;
    font-size: $font-size-16px;
    width: 100%;
    border-radius: 3px;
  }
}

.book-list{
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 12px;
  padding-top: 0px;
  li{
    width:22%;
    margin-right: 4%;
    &:nth-of-type(4){
      margin-right: 0;
    }
    p{
      text-align: center;
    }
    img,.van-image{
      width: 80px;
        height: 80px;
        border-radius: 6px;
        overflow: hidden;
    }
  }
}
.book{
  margin-top: 12px;
  &::after{
    display: none;
  }
}
.detail-box{
  // min-height: 100%;
  // overflow: auto;
  padding-bottom: 68px;
  background-color: #fff;
  flex-grow: 1;
  // margin-top: 230px;
  // height: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
.layout{
  height: 100%;
  // position: relative;
  // padding-bottom: 68px;
  background: transparent;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  // padding-bottom: 168px;
   &::-webkit-scrollbar {
    display: none;
  }
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .back{
    // position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 46px;
    height: 46px;
    text-align: center;
    line-height: 46px;
    font-size: .18rem;
    flex-shrink: 0;
  }
}
.introduce{
  padding:15px;
  padding-top: 20px;
  h5{
    font-size: $font-size-18px;
    font-weight: normal;
    margin-bottom: 10px;
  }
  p{
    line-height: 1.6;
    text-indent: 2em;
  }

}
</style>
