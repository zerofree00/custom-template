<template>
  <div class="reply-box">
    <p class="nav">
      <i />
      <span>精彩评论</span>
    </p>
    <Empty v-if="list.length === 0" />
    <Item
      v-for="item in list"
      :key="item.id"
      :data="item"
      @reply="getReplyData"
    />
  </div>
  <div
    :style="{bottom:inputBottom+'px'}"
    class="reply-input-box van-hairline--top"
  >
    <van-field
      v-model="replycontent"
      rows="1"
      autosize
      type="textarea"
      placeholder="写评论"
      ref="messageField"
    />
    <van-button
      type="primary"
      size="small"
      @click="reply"
    >
      评论
    </van-button>
  </div>
</template>
<script setup lang="ts">
import { experienceReplyPage, addExperienceReply } from '@/api/experience'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import Item from './item.vue'
import { keyboardHeight } from '@/hooks/keyboard'
import { Toast } from 'vant'
const route = useRoute()
// 获取列表
const list = ref<Array<any>>([])
const id:string = route.params.id as string
const getList = function () {
  experienceReplyPage(id).then(res => {
    list.value = res
  })
}
getList()

// 评论
const replycontent = ref('')
const {
  inputBottom,
  messageField,
  focus,
  resetInputBottom
} = keyboardHeight()
//  一级评论
const reply = function () {
  if (replycontent.value.length === 0) return Toast('请输入评论')
  const params:any = {}
  if (replyData) {
    params.parentId = replyData.id
    params.beReplyId = replyData.replyUserId
    params.beReplyName = replyData.replyUserName
  }
  addExperienceReply({
    parentId: -1,
    experienceId: id,
    replyContent: replycontent.value,
    ...params
  }).then(() => {
    Toast('评论成功')
    replycontent.value = ''
    getList()
    resetInputBottom()
    replyData = null
  })
}
// 二级评论 回复
let replyData:any = null
const getReplyData = function (data: any) {
  focus()
  replyData = data
  console.log(replyData)
}

</script>
<style lang="scss" scoped>
.nav{
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  span{
    font-size: 18px;
    color: $text-color;
  }
  i{
    width: 5px;
    height: 21px;
    background: rgba(35, 99, 225, 1);
    border-radius: 0px 4px 0px 4px;
    display: inline-block;
    margin-right: 12px;
  }
}
.reply-box{
  padding:$padding-md 0;
  background-color: #fff;
}
.reply-input-box{
  display: flex;
  padding: 10px 12px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .van-button{
    width: 80px;
    flex-shrink: 0;
    margin-left: 12px;
  }
  .van-field{
    min-height: 32px;
    padding: 0;
    background-color: rgba(240, 240, 240, 1);
    padding: 3px 6px;
  }
}
</style>
