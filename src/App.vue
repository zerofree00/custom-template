<template>
  <router-view v-slot="{ Component }">
    <!-- 注释节点 勿删！  -->
    <keep-alive :include="include">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import { getUrlParams } from '@/utils/utils'
import { useStore } from '@/store'
import { computed } from 'vue'
/** * 配置处理 S ** */
const { statusBarHieght, token, refreshToken } = getUrlParams()
if (statusBarHieght) {
  localStorage.setItem('statusBarHieght', statusBarHieght)
  document.getElementsByTagName(
    'html'
  )[0].style.paddingTop = `${statusBarHieght}px`
} else if (localStorage.getItem('statusBarHieght')) {
  document.getElementsByTagName(
    'html'
  )[0].style.paddingTop = `${localStorage.getItem('statusBarHieght') || 0}px`
}
const store = useStore()
if (token) {
  store.state.userInfo.token = token
}
if (refreshToken) {
  store.state.userInfo.refreshToken = refreshToken
}

const include = computed(() => store.getters.getInclude)
store.commit('addInclude', 'me')
store.commit('addInclude', 'groupList')
store.commit('addInclude', 'index')
store.commit('addInclude', 'study-data-index')
</script>

<style lang="scss" >
.ellipsis_3{
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.ellipsis_2{
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.van-hairline--bottom:last-child:after{
  display: none;
}
</style>
