<template>
  <i
    @click="voice"
    class="iconfont icon-yuyin"
  />
</template>
<script lang="ts" setup>
// import { getVoiceText } from '@/utils/utils'
const emit = defineEmits<{(e: 'load', val:string): void}>()

const voice = function () {
  // getVoiceText()
}
let admsg = ''
// @ts-ignore//
window.setVoiceContent = function (msg) {
  // that.$toast(msg.toString())
  const m = msg.substr(0, msg.length - 1)
  if (admsg !== msg && admsg !== m) {
    emit('load', msg)
  }
  admsg = msg

  // message += msg
}
// @ts-ignore//
window.setVoiceContentIOS = function (msg) {
  // {"text":"1234567"}
  // that.$toast(JSON.stringify(msg))
  emit('load', JSON.parse(msg).text)
  // that.message += JSON.parse(msg).text
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
