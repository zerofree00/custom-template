<template>
  <div class="item-box">
    <div class="avatar">
      <img
        src="@/assets/images/photo.png"
        alt=""
      >
    </div>
    <div class="info van-hairline--bottom">
      <p>
        <span>{{ data.replyUserName }}</span>
        <span @click="like"><van-icon
          :color="showRecord ==='0'?'#999':'rgba(206, 1, 1, 1)'"
          name="good-job-o"
        /><i :style="{color:showRecord ==='0'?'#999':'rgba(206, 1, 1, 1)'}">{{ recordCount }}</i></span>
      </p>
      <p class="reply-content">
        <span v-if="data.beReplyName">回复{{ data.beReplyName }}:</span> {{ data.replyContent }}
      </p>
      <p>
        <span>{{ data.replyDate }}</span><span @click="reply"> · 回复</span>
      </p>
      <div
        v-show="data.childList.length"
        class="child-reply"
      >
        <replyItem
          v-for="item in data.childList"
          :key="item.id"
          :data="item"
          @reply="childReply"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="replyItem">
import { addLike, deleteLike } from '@/api/experience'
import { ref } from 'vue'
const props = defineProps<{
  data: any
}>()
const showRecord = ref(props.data.showRecord)
const recordCount = ref(props.data.recordCount)
const emit = defineEmits<{(e: 'reply', value:string): void}>()
const like = function () {
  if (showRecord.value === '0') {
    // 点赞
    addLike({
      experienceId: props.data.experienceId,
      experienceReplyId: props.data.id,
      time: new Date().getTime()
    }).then(() => {
      showRecord.value = '1'
      recordCount.value++
    })
  } else {
    // 取消点赞
    deleteLike(props.data.id).then(() => {
      showRecord.value = '0'
      recordCount.value--
    })
  }
}

const reply = function () {
  emit('reply', props.data)
}
const childReply = function (data:any) {
  emit('reply', {
    ...data,
    id: data.parentId
  })
}

</script>
<style lang="scss" scoped>
.item-box{
  display: flex;
  padding-top: 6px;
  // padding-bottom: 6px;
  .avatar{
    width: 31px;
    height: 31px;
    border-radius: 50%;
    margin-right: 6px;
    flex-shrink: 0;
  }
  .info{
    width: 100%;
    padding-bottom: 6px;
    p{
      &:nth-of-type(1){
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          &:nth-of-type(1){
            color: rgba(247, 125, 7, 1);
            font-size: $font-size-14px;
          }
          &:nth-of-type(2){
            color: $text-color-gary2;
            font-size: $font-size-14px;
            .van-icon{
              font-size: 16px;
            }
            i{
              &:nth-of-type(2){
                font-style: normal;
                width: 20px;
                display: inline-block;
                text-align: right;
              }

            }
          }
        }
      }
      &:nth-of-type(2){
        color: $text-color;
        font-size: $font-size-16px;
        margin-top: 6px;
        margin-bottom: 4px;
        span{
          color: $text-color-gary2;
          font-size: $font-size-14px;
        }
      }
      &:nth-of-type(3){
        span{
          &:nth-of-type(1){
            color: $text-color-gary2;
            font-size: $font-size-12px;
          }
          &:nth-of-type(2){
            color: $text-color;
            font-size: $font-size-14px;
          }
        }
      }
    }
  }
}
.child-reply{
  background-color: rgba(248, 248, 248, 1);
  padding: 12px;
  padding-top: 6px;
  margin-top: 6px;
}
</style>
