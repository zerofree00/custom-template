<template>
  <div
    class="shareListItem van-hairline--bottom"
    @click="goDetail(item.id)"
  >
    <div class="info">
      <p class="">
        {{ item.title }}
      </p>
      <p>
        {{ item.content }}
      </p>
      <p style="margin-top: 10px;">
        <van-image
          round
          width="7vw"
          height="7vw"
          :src="item.photo"
          style="vertical-align: middle"
        />
        <span style="vertical-align: middle;color: #666666;">&nbsp;&nbsp;
          {{ item.name }}
          &nbsp;&nbsp;{{ item.time }}</span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts" name="shareListItem">
import { useRouter } from 'vue-router'

interface Props {
  item?: {}
}
withDefaults(defineProps<Props>(), {
  item: () => { return {} }
})

const router = useRouter()
const goDetail = (id:string) :void => {
  router.push({
    path: `/experience/detail/${id}`,
    query: {

    }
  })
}

</script>
<style lang="scss" scoped>

.shareListItem{
  padding: 10px 0;
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
      font-size: $font-size-14px;
      color: $text-color-gary2;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      margin-top: 10px;
      margin-bottom: 8px;
      line-height: 1.5;
    }
    p:nth-of-type(3){
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
