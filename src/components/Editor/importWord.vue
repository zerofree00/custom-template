<template>
  <van-button
    class="import-word"
    @click="getPermissions"
  >
    <i class="iconfont icon-word" /> 导入文档
  </van-button>
  <input
    ref="inputUpload"
    style="display:none"
    type="file"
    @change="upload"
  >
</template>
<script lang="ts" setup>
// import { importWord } from '@/api/index'
import { ref } from 'vue'
// interface HTMLInputEvent extends Event {
//     target: HTMLInputElement & EventTarget;
// }
// const emit = defineEmits<{(e: 'load', val:string): void}>()

const inputUpload = ref<any>(null)
const getPermissions = function () {
  inputUpload.value.click()
}
const upload = function (e:any) {
  const formData = new FormData()
  formData.append('file', e?.target.files[0])
  // importWord(formData).then((res:any) => {
  //   emit('load', res)
  // })
}
</script>
<style lang="scss" scoped>
.van-button{
  width: 100px;
  color: $main-color;
  padding: 0;
  border: none;
  line-height: 24px;
  font-size: 14px;
  height: 24px;
}
</style>
