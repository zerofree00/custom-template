<template>
  <div class="cover">
    <van-image
      v-if="url"
      fit="cover"
      position="center"
      :src="url"
    />
    <div
      v-else
      class="image"
    >
      <img
        :src="defaultUrl"
        alt=""
      >
      <p>
        <slot />
      </p>
    </div>
  </div>
</template>
<script setup lang="ts" name="Cover">
import book1 from '@/assets/images/book1.png'
import book2 from '@/assets/images/book2.png'
import book3 from '@/assets/images/book3.png'
import { ref } from 'vue'
import book4 from '@/assets/images/book4.png'
defineProps<{
  url?: string
}>()
const defaultUrl = ref('')
switch (Math.floor(Math.random() * 4)) {
  case 0:
    defaultUrl.value = book1
    break
  case 1:
    defaultUrl.value = book2
    break
  case 2:
    defaultUrl.value = book3
    break
  case 3:
    defaultUrl.value = book4
    break
  default:
    break
}
</script>
<style lang="scss" scoped>
.cover{
  width: 100%;
  padding-top: 142%;
  position: relative;
}
.van-image,.image{
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
