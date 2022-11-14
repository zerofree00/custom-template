<template>
  <div class="empty">
    <img
      src="@/assets/images/empty.png"
      alt=""
    >
    <p v-if="search">
      找不到关于“<span>{{ search }}</span>”的结果
    </p>
    <p v-else>
      {{ msg }}
    </p>
  </div>
</template>
<script setup lang="ts" name="Empty">
interface Props {
  // list?: Array<object>,
  msg?: string,
  search?:string
}
withDefaults(defineProps<Props>(), {
  msg: '暂无数据',
  search: ''
})
</script>
<style lang="scss" scoped>
.empty{
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin: 0 auto;
  img{
    width: 130px;
  }
  p{
    font-size: $font-size-14px;
    color: $text-color-gary1;
  }
}
</style>
