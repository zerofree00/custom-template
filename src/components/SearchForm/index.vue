<template>
  <div class="search-form-box">
    <div class="search-input">
      <div>
        <slot />
      </div>
      <form
        action=""
        style="width: 100%;"
      >
        <van-search
          v-model="value"
          :placeholder="placeholder || '请输入搜索关键词'"
          @search="search"
        />
      </form>
      <van-icon name="search" />
    </div>
  </div>
</template>

<script lang="ts" setup name="SearchForm">
import { ref, watch } from 'vue'

defineProps<{
  keywords?:string,
  placeholder?:string
}>()
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'update:keywords', value:string): void
  (e: 'search'): void
}>()

const value = ref('')
watch(value, () => {
  emit('update:keywords', value.value)
})
const search = function () {
  emit('search')
}
</script>

<style lang="scss" scoped>
.search-input{
  >i{
    color: #999;
  }
  font-size:$font-size-14px;
  width: 100%;
  display: flex;
  background-color: #fff;
  margin: 8px 0;
  border-radius: 16px;
  height: 32px;
  line-height: 32px;
  align-items: center;
  padding: 0 $padding-md;
  overflow: hidden;
  input{
    flex-grow: 1;
    border: none;
    padding: 0;
  }
}
:deep(.van-search){
  padding: 0;
  width: 100%;
  .van-search__content{
    background-color: transparent;
    .van-field__control{
      font-size:$font-size-14px;
    }
    .van-field__left-icon{
      display: none;
    }
  }
}
</style>
