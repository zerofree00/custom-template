<template>
  <div class="layout">
    <div class="detail-box">
      <div class="swiper-box">
        <img
          src="../../assets/images/22.png"
          alt=""
        >
      </div>

      <div class="notice">
        <div style="flex-shrink: 0;">
          <img
            @click="$router.push('/notify/index')"
            src="@/assets/images/index/gg.png"
            alt=""
          >
        </div>
        <p
          v-if="notifyList.length === 0"
          class="no-more"
        >
          暂无公告~
        </p>
        <ul>
          <li
            v-for="item in notifyList"
            :key="item.id"
            class="van-ellipsis"
          >
            <router-link
              class="van-ellipsis"
              :to="`/notify/detail/${item.id}`"
            >
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="count-box">
        <div class="group">
          <div class="name">
            <p>悦读分享</p>
            <router-link
              custom
              to="/experience/index"
              v-slot="{ navigate }"
            >
              <p @click="navigate">
                &nbsp;&nbsp;更多
                <van-icon name="arrow" />
              </p>
            </router-link>
          </div>
          <ExperienceItem :item="readShareItem" />
        </div>
      </div>
      <div class="count-box">
        <div class="group">
          <div class="name">
            <p>好书推荐</p>
            <router-link
              custom
              to="/study-data/recommend"
              v-slot="{ navigate }"
            >
              <p @click="navigate">
                &nbsp;&nbsp;更多
                <van-icon name="arrow" />
              </p>
            </router-link>
          </div>

          <div class="experience-list-box">
            <StudyDataItem
              v-for="(item,index) in readShareList"
              :key="index"
              :item="item"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="index">
import StudyDataItem from '@/views/StudyData/item.vue'
import ExperienceItem from '@/views/Experience/item.vue'
import { onActivated, onDeactivated, reactive, ref } from 'vue'
import { notifyPage, databasePage } from '@/api/experience'
import { useStore } from '@/store'
// import bg from '@/assets/images/22.png'
// import banner from '@/assets/images/index-bg.png'

// 公告数据
const notifyList = ref<Array<any>>([
  {
    id: '1569247515007328258',
    title: '辽宁省政协第三期委员读书活动方案',
    pubUnitName: '人口资源环境委员会',
    pubDate: '2022-09-12 16:52'
  },
  {
    id: '1559083618205724674',
    title: '省政协第二期委员读书活动通知',
    pubUnitName: '农业和农村委员会',
    pubDate: '2022-08-15 15:44'
  },
  {
    id: '1557638649005891586',
    title: '辽宁省政协第二期委员读书活动方案',
    pubUnitName: '农业和农村委员会',
    pubDate: '2022-08-11 16:02'
  }
])

const readShareItem = reactive({
  title: '锦州市政协王鹤松《粮食安全干部读本》读书体会',
  name: '昂委员',
  id: '昂委员',
  time: '2022-08-05',
  photo: 'https://img01.yzcdn.cn/vant/cat.jpeg',
  content: '读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享'
})
const readShareList = ref<Array<any>>([{
  title: '锦州市政协王鹤松《粮食安全干部读本》读书体会',
  name: '昂委员',
  time: '2022-08-05',
  photo: 'https://img01.yzcdn.cn/vant/cat.jpeg',
  content: '读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享'
}, {
  title: '锦州市政协王鹤松《粮食安全干部读本》读书体会',
  name: '昂委员',
  time: '2022-08-05',
  photo: 'https://img01.yzcdn.cn/vant/cat.jpeg',
  content: '读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享'
}, {
  title: '读写讯息的信贷分享',
  name: '昂委员',
  time: '2022-08-05',
  photo: 'https://img01.yzcdn.cn/vant/cat.jpeg',
  content: '读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享'
}, {
  title: '读写讯息的信贷分享',
  name: '昂委员',
  time: '2022-08-05',
  photo: 'https://img01.yzcdn.cn/vant/cat.jpeg',
  content: '读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享读写讯息的信贷分享'
}])

// 学习资料数据
const database = ref('0')
onActivated(() => {
  document.getElementsByTagName(
    'html'
  )[0].style.background = '#f5f6fa top center / 100%  no-repeat'
  // document.getElementsByTagName(
  //   'html'
  // )[0].style.background = `#f5f6fa url('${bg}') top center / 100%  no-repeat`
  document.getElementsByTagName(
    'html'
  )[0].style.paddingTop = '0'
  init()
})
onDeactivated(() => {
  document.getElementsByTagName('html')[0].style.background = ''
  if (localStorage.getItem('statusBarHieght')) {
    document.getElementsByTagName(
      'html'
    )[0].style.paddingTop = `${localStorage.getItem('statusBarHieght') || 0}px`
  } else {
    document.getElementsByTagName(
      'html'
    )[0].style.paddingTop = ''
  }
})
// const initBg = function () {
//   console.log('进入')
// }
// initBg()
// onUnmounted(() => {
//   console.log('离开')
// })

const sotre = useStore()
// sotre.commit('addInclude', 'index')
// 清空部分页面缓存

const init = function () {
  sotre.commit('deleteInclude', 'databaselList')
  sotre.commit('deleteInclude', 'experienceList')
  sotre.commit('deleteInclude', 'collection')
  sotre.commit('deleteInclude', 'notifyList')
  sotre.commit('deleteInclude', 'cppccStudy')
  // sotre.commit('deleteInclude', 'crentList')
  sotre.commit('deleteInclude', 'newList')
  sotre.commit('deleteInclude', 'recommendList')
  notifyPage({
    keyName: '',
    keywords: '',
    order: true,
    pageNum: 1,
    pageSize: 3,
    queryDTO: {},
    sort: ''
  }).then(res => {
    notifyList.value = res.records
  })

  databasePage({
    keyName: '',
    keywords: '',
    order: true,
    pageNum: 1,
    pageSize: 10,
    queryDTO: {
      docType: ''
    },
    sort: ''
  }).then(res => {
    database.value = ((res.total + '').split('').map((e, index) => index === 0 ? e : 0).join(''))
  })
}

</script>
<style lang="scss" scoped>
.layout {
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.swiper-box {
  min-height: 190px;
}

.notice {
  padding: 8px 12px;
  height: 82px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 4px rgba(215, 227, 250, 0.48);
  border-radius: 6px;
  margin: -60px 12px 12px;
  position: relative;
  z-index: 2;
  // width: 100%;
  display: flex;
  overflow: hidden;
  flex-basis: 50%;

  img {
    width: 48px;
    margin-right: 12px;
    flex-shrink: 0;
    margin-top: 10px;
  }

  ul {
    flex-grow: 1;
    width: 200px;

    li {
      font-size: 15px;
      width: 100%;

      &::before {
        content: '';
        width: 6px;
        height: 6px;
        background: #FFA200;
        display: inline-block;
        border-radius: 50%;
        margin-bottom: 3px;
        margin-right: 6px;
      }

      a {
        color: $text-color;
      }
    }
  }
}

.count-box {
  background-color: #fff;
  padding: 10px;
  margin: 12px;
  border-radius: 6px;

  .van-cell {
    padding: 0;

    &::after {
      display: none;
    }
  }

  .cell-title {
    font-size: 19px;
    font-weight: bold;
  }

  .count-item-box {
    display: flex;
    align-items: center;
    margin-top: 14px;

    > div {
      &:nth-of-type(2) {
        margin: 0 8px;
      }
    }

    .count-item {
      background: rgba(237, 243, 255, 1);
      border-radius: 4px;
      padding: 9px 12px;
      width: 100%;

      .name {
        display: flex;
        align-items: center;

        img {
          width: 17px;
          margin-right: 6px;
        }

        span {
          font-size: 14px;

          &:nth-of-type(2) {
            color: rgba(145, 145, 145, 1);
          }
        }
      }

      > p {
        font-size: 24px;
        line-height: 24px;
        text-align: center;
        margin-top: 10px;
      }
    }
  }
}

.group {
  //background: rgba(250, 250, 250, 1);
  border-radius: 4px;
  padding-top: 12px;
  padding-right: 10px;
  margin-top: 15px;

  &:first-child {
    margin-top: 0;
  }

  .name {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      &:nth-of-type(1) {
        font-size: 18px;
        font-weight: bold;

        &::before {
          content: '';
          width: 6px;
          height: 18px;
          background: rgba(28, 101, 230, 1);
          display: inline-block;
          margin-right: 7px;
          vertical-align: middle;
        }
      }

      &:nth-of-type(2) {
        font-size: 12px;
        color: rgba(145, 145, 145, 1);

        span {
          color: $text-color;
        }
      }
    }
  }

  ul {
    //background: url('@/assets/images/index/dsq-bg.png') bottom center no-repeat;
    background-size: 100%;
    padding: 7px 7px 29px;
    overflow-x: auto;
    display: flex;

    &::-webkit-scrollbar {
      display: none;
    }

    li {
      flex-shrink: 0;
      display: inline-flex;
      width: 140px;
      // height: 48px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 1.25px 2.51px rgba(242, 233, 233, 0.25);
      border-radius: 4px;
      padding: 7px;
      margin-right: 6px;

      p {
        display: -webkit-box; // 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示
        -webkit-box-orient: vertical; // 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式
        -webkit-line-clamp: 2; // 用来限制在一个块元素显示的文本的行数，根据需要写。
        overflow: hidden; // 溢出多余裁剪
      }

      img {
        width: 35px;
        height: 34px;
        flex-shrink: 0;
        margin-right: 9px;
      }
    }
  }
}

.link-box {
  padding: 0 12px 12px;

  // margin: 12px;
  .link {
    height: 75px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 4px rgba(247, 195, 195, 0.25);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 17px;
    margin-bottom: 12px;

    .name {
      img {
        width: 48px;
        margin-right: 19px;
      }

      display: flex;
      align-items: center;
      width: 200px;

      div {
        margin-top: -6px;

        p {
          &:nth-of-type(1) {
            font-size: 18px;
          }

          &:nth-of-type(2) {
            color: rgba(145, 145, 145, 1);
            font-size: 14px;
          }
        }
      }
    }

    > img {
      width: 21px;
    }
  }
}

.no-more {
  width: 100%;
  text-align: center;
  line-height: 4;
}
</style>
