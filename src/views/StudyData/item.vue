<template>
  <div
    class="experience-item van-hairline--bottom"
    @click="goDetail"
  >
    <div class="img">
      <Cover :url="item.cover" />
    </div>
    <div class="info">
      <p class="">
        {{ item.title }}
      </p>
      <p>
        作者：{{ item.dd || '-' }}
      </p>
      <p>
        {{ item.content }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts" name="bookListItem">
import { useRouter } from 'vue-router'

interface Props {
  item?: { }
}
withDefaults(defineProps<Props>(), {
  item: () => { return {} }
})
const router = useRouter()
const goDetail = function (id: string) {
  router.push('/group/detail/' + id)
}

</script>
<style lang="scss" scoped>

.experience-item{
  display: flex;
  padding: 10px 0;
  .img{
    width: 70px;
    flex-shrink: 0;
    margin-right: 12px;
  }
  .info{
    p:nth-of-type(1){
      font-size: $font-size-16px;
      color: $text-color;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
    p:nth-of-type(2){
      margin-top: 10px;
      font-size: $font-size-14px;
      color: $text-color-gary1;
    }
    p:nth-of-type(3){
      font-size: $font-size-12px;
      color: $text-color-gary2;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      margin-top: 10px;
      margin-bottom: 8px;
      line-height: 1.5;
    }
    p:nth-of-type(4){
      span{
        font-size: $font-size-12px;
        color: $text-color-gary2;
        margin-right: 18px;
        img{
          width: 11px;
          vertical-align: text-top;
          margin-right: 3px;
        }
      }
    }
  }
}
</style>
