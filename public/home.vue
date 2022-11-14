<template>
  <div class="home">
    <van-nav-bar class="after_none page_nav_bar" title="政协书院" left-arrow @click-left="backApp" fixed />
    <div class="header_box">

      <div class="swiperList_box box_shadow">
        <!-- <van-swipe @change="onChange" :autoplay="3000">
            <van-swipe-item v-for="(item,index) in swiperList" :key="index" @click="goPage('/noticeDetail',{
                type:1,
                id:item.strId
            })">
                <van-image fit="cover" :src="item.strImagePath">
                    <template v-slot:error>加载失败</template>
                </van-image>
                <div class="swipe_tip">
                    <div class="ellipsis_1">{{item.strTitle}}</div>
                </div>
            </van-swipe-item>
            <template #indicator>
                <div class="custom-indicator">
                    <span class="text-red">{{ current + 1 }}</span>/{{swiperList.length}}
                </div>
            </template>
        </van-swipe> -->
        <!-- {{ window.apiObj.apiUrl + groupObj.strGroupPic }} -->
        <!-- <img :src="window.apiObj.apiUrl + groupObj.strGroupPic"> -->
        <van-swipe @change="onChange" :autoplay="3000">
          <van-swipe-item @click="joinGroup">
            <van-image fit="cover" :src="groupObj.strGroupPic">
              <template v-slot:error>加载失败</template>
            </van-image>
            <!-- <div class="swipe_tip">
                <div class="ellipsis_1">{{item.strTitle}}</div>
            </div> -->
          </van-swipe-item>

        </van-swipe>
      </div>
    </div>

    <div class="notice_box" @click="goPage('/notice')"></div>

    <div class="nav_box">
      <div class="  nav_box_item">
        <div class="nav_box_item_item bg-1" @click="goPage('/readingGroup')">
          <div class="text">读书群</div>
          <van-image :src="icon_1" />
        </div>
        <div class="nav_box_item_item bg-2" @click="goPage('/stackRoom')">
          <div class="text">委员书库</div>
          <van-image :src="icon_2" />
        </div>
        <div class="nav_box_item_item bg-3" @click="goPage('/review')">
          <div class="text">书评书讯</div>
          <van-image :src="icon_3" />
        </div>
        <div class="nav_box_item_item bg-4" @click="goPage('/bookshelf')">
          <div class="text">我的书架</div>
          <van-image :src="icon_4" />
        </div>
        <div class="nav_box_item_item bg-8" @click="goApplet">
          <div class="text">重庆市图书馆</div>
          <van-image :src="icon_8" />
        </div>
        <!-- <div class="nav_box_item_item bg-5" @click="goPage('/recommend')">
            <div class="text">我的推荐</div>
            <van-image :src="icon_5" />
        </div> -->
      </div>

    </div>

  </div>
</template>

<script>
import { bookIndexShowServlet, bookLastestNoticeListServlet } from "api/readingGroup";
import { mapMutations } from 'vuex'
import { getRequest, getStrObj } from "assets/js/util";
import { Dialog } from 'vant';
export default {
  data () {
    return {
      notice_icon: require("assets/images/home/notice_cq_icon.png"),
      icon_1: require("assets/images/home/03.png"),
      icon_2: require("assets/images/home/04.png"),
      icon_3: require("assets/images/home/05.png"),
      icon_4: require("assets/images/home/06.png"),
      icon_5: require("assets/images/home/07.png"),
      icon_6: require("assets/images/home/icon_6.png"),
      icon_8: require("assets/images/home/08.png"),
      current: 0,
      swiperList: [],
      groupObj: {}
    }
  },
  components: {
  },
  created () {
    window.getValueForApp = this.getValueForApp

    // alert('dsf')
    const urlObj = getRequest();

    if (!urlObj.strSid) {
      Dialog.alert({
        title: '友情提示',
        message: '连接超时，请重新连接',
      }).then(() => {
        this.backApp()
      });

      return
    }

    localStorage.setItem('strSid', urlObj.strSid)

    bookIndexShowServlet().then(res => {
      this.swiperList = res.objList || []
      this.groupObj = res
      this.groupObj.strGroupPic = window.apiObj.apiUrl + this.groupObj.strGroupPic
    })


  },

  mounted () {
    this.$toast.clear()
    // this.$toast.fail({
    //     message: '你未加入任何专委会，无法推荐书籍！',
    //     // duration: ''
    // })
  },
  methods: {
    backApp () {
      var u = navigator.userAgent;
      if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        JsBridge.backApp()
      }
      if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
        window.webkit.messageHandlers.backApp.postMessage('');
      }
    },
    joinGroup () {
      if (!this.groupObj.qidaId) return this.$toast('暂无群组~')
      var u = navigator.userAgent;
      if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        JsBridge.joinGroup(this.groupObj.qidaId)
      }
      if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
        window.webkit.messageHandlers.joinGroup.postMessage(this.groupObj.qidaId);
      }
    },
    goApplet(){
      var u = navigator.userAgent;
      if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        JsBridge.goMiniProgram('gh_5fb92cc9cdd8')
      }
      if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
        window.webkit.messageHandlers.goMiniProgram.postMessage('gh_5fb92cc9cdd8');
      }
      // window.open('http://weixin.cqshusheng.cn/CTWX/index.php/Home/Book/books.html')
    },

    // 从app中获取参数
    getValueForApp (data) {
      if (!data) return;

      const newdata = getStrObj(data)
      localStorage.setItem('loginHaiBiAccessToken', newdata.loginHaiBiAccessToken)
      localStorage.setItem('haibiUserId', newdata.haibiUserId)
    },
    goPage (path, query) {
      query = query || {}
      this.$router.push({
        path: path,
        query: query
      })
    },
    onChange (index) {
      this.current = index;
    },
    ...mapMutations({
      setCatchComponents: 'SET_CATCHE_COMPONENTS'
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/stackRoom') {
      this.setCatchComponents(['stackRoom'])
    }
    if (to.path === '/notice') {
      this.setCatchComponents(['Notice'])
    }
    next();
  },
};
</script>

<style lang="stylus" >
.home
  height 100%
  background-image url('../assets/images/rg/bg.png')
  background-size 100% 100%
  background-repeat no-repeat
  .page_nav_bar
    .van-nav-bar__title
      background-image url('~assets/images/home/01.png')
      background-repeat no-repeat
      background-size 100% auto
      font-size 0
      width 210px
      height 40px
      background-position-y 6px
  .notice_box
    margin 20px auto
    background-image url('~assets/images/home/02.png')
    background-repeat no-repeat
    background-size 100% auto
    font-size 0
    width 350px
    height 45px
  .van-nav-bar
    background-color $themeColor
    box-shadow none
    .van-nav-bar__title, .van-icon
      color #fff
  .custom-indicator
    position absolute
    right 5px
    bottom 5px
    padding 2px 5px
    font-size 14px
    background rgba(0, 0, 0, 0.1)
    color white
  .header_box
    background-image url('../assets/images/home/title_bg.png')
    background-size contain
    background-repeat no-repeat
    // margin-top -10px
    padding-top 10px
    margin-top -2px
  .nav_box
    width 350px
    margin 0 auto
    .text
      font-size 16px
      font-weight 600
    .nav_box_item
      .nav_box_item_item
        display flex
        justify-content space-between
        align-items center
        padding 0 20px
        background-size contain
        background-repeat no-repeat
        width 350px
        height 60px
        text-align center
        margin-bottom 15px
        font-size 22px
        color #fff
        .van-image
          height 40px
          img
            width auto
    .bg-1
      background-color #5A6AF1
      .van-image
        height 45px !important
    .bg-2
      background-color #FF875E
    .bg-3
      background-color #80B5FE
      .van-image
        height 50px !important
        margin-right 6px
    .bg_4_1
      background-image url('../assets/images/home/bg_4_1.png')
    .bg_5_1
      background-image url('../assets/images/home/bg_5_1.png')
    .bg_6_1
      background-image url('../assets/images/home/bg_6_1.png')
    .bg-4
      background-color #FFB650
      .van-image
        height 34px !important
    .bg-5
      background-color #FE9CC2
    .bg-8
      background-color #b286ce
      .van-image
        margin-right 13px
  .swiperList_box
    width 350px
    height 166px
    overflow hidden
    margin 0 auto
    margin-top 10px
    .van-image
      width 350px
      height 166px
    .swipe_tip
      height 50px
      padding 10px 30px 0 10px
      font-size 14px
      color white
      // background linear-gradient(#fff, #828282)
      position absolute
      bottom 0
      left 0
      right 0
      z-index 10
      background-image url('../assets/images/home/mask.png')
      background-repeat-x repeat
      background-size 50% 100%
</style>
