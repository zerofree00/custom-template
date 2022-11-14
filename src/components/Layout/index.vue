<template>
  <div class="layout">
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <slot name="header" />
      </template>
    </van-nav-bar>
    <div class="search-box">
      <slot name="search" />
    </div>
    <div
      class="content-box"
      :class="{isPadding}"
    >
      <slot />
    </div>
    <div class="footer-box">
      <slot name="footer" />
    </div>
  </div>
</template>
<script lang="ts" setup name="Layout">
import { useRouter } from 'vue-router'
const router = useRouter()
const emit = defineEmits<{(e: 'back', cb?:()=>void): void}>()

interface Props {
  title?: string
  leftText?: string
  isPadding?:boolean
  isBack?:boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '标题',
  leftText: '',
  isPadding: true,
  isBack: true

})
const onClickLeft = function ():void {
  if (props.isBack) {
    router.back()
    emit('back')
  } else {
    emit('back', router.back)
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  .van-nav-bar{
    background-color: #fff;
    height: 44px;
    line-height: 44px;
    :deep(.van-nav-bar__title){
      color: $text-color;
      font-size: $font-size-18px;
    }
    :deep( .van-nav-bar__arrow){
      color: $text-color;
      font-size: $font-size-18px;
    }
  }
  .van-hairline--bottom{
    &::after{
      display: none;
    }
  }
  .content-box{
    background: #F6F6F6;
    height: 100%;
    flex-grow:1;
    // flex-shrink: 0;
    // padding: 0 $padding-md;
    overflow-y: auto;    padding-top: 10px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .search-box{
    // padding: 0 $padding-md;
    background-color: #fff;
  }
}
.isPadding{
  padding:$padding-md;
}
</style>
