<template>
  <Layout
    title="我要荐书"
    :is-padding="false"
  >
    <van-form @submit="confirm">
      <van-cell-group inset>
        <van-field
          required
          v-model="form.bookName"
          name="书籍名称"
          label="书籍名称"
          placeholder="书籍名称"
          :rules="[{ required: true, message: '请填写书籍名称' }]"
        />
        <van-field
          required
          v-model="form.bookAuthor"
          name="作者"
          label="作者"
          placeholder="作者"
          :rules="[{ required: true, message: '请填写作者' }]"
        />
        <van-field
          name="uploader"
          label="封面"
        >
          <template #input>
            <div
              v-show="off"
              @click="getCamare"
              class="van-uploader"
            >
              <div class="upload">
                <van-icon name="plus" />
                <span>上传封面</span>
              </div>
            </div>
            <van-uploader
              v-show="!off"
              :max-size="1024 * 1024"
              @oversize="onOversize"
              :max-count="1"
              v-model="fileList"
              ref="uploadref"
            >
              <div class="upload">
                <van-icon name="plus" />
                <span>上传封面</span>
              </div>
            </van-uploader>
          </template>
        </van-field>
        <van-field
          required
          v-model="form.bookProfile"
          name="推荐原因"
          label="推荐原因"
          placeholder="推荐原因"
          type="textarea"
          rows="12"
          :rules="[{ required: true, message: '请填写推荐原因' }]"
        />
      </van-cell-group>
      <div
        class="footer"
        style="margin: 16px;"
      >
        <van-button
          round
          block
          type="primary"
          native-type="submit"
        >
          提交
        </van-button>
        <van-button
          round
          block
          @click="$router.back()"
        >
          返回
        </van-button>
      </div>
    </van-form>
  </Layout>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getCamarePermission } from '@/utils/utils'
import { addRecommend } from '@/api/experience'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
const off = ref(true)
const uploadref = ref<any>(null)
// @ts-ignore
window.getPermissionFinish = function () {
  // that.$toast('获取成功')
  off.value = false
  uploadref.value?.chooseFile()
}
// @ts-ignore
window.getPermissionFinishIOS = function () {
  // that.$toast('获取成功')
  off.value = false
  uploadref.value?.chooseFile()
}
const getCamare = function () {
  getCamarePermission()
}

const form = reactive({
  bookAuthor: '',
  bookCover: '',
  bookName: '',
  bookProfile: ''
})
const fileList = ref<Array<any>>([])
const router = useRouter()
const confirm = function () {
  // console.log(this.fileList.map(e=>e.strFileId).join())
  // return
  addRecommend({
    ...form,
    bookCover: fileList.value.length ? fileList.value[0].content : ''
  })
    .then((res) => {
      Toast('推荐成功，请等待审核')
      router.back()
    })
    .catch((error) => {
      console.log(error)
    })
}

const onOversize = function () {
  Toast('文件大小不能超过1MB')
}

</script>

<style lang="scss" scoped>
.upload {
  background-color: #f5f5f5;
  width: 100px;
  height: 100px;
  text-align: center;
  padding-top: 18px;
  i {
    display: block;
    font-size: 40px;
    color: #e0e0e0;
    padding-bottom: 5px;
  }
  span {
    color: #919191;
    font-size: 11px;
  }
}
.van-cell-group{
  margin: 0;
  height: 100%;
  overflow-y: auto;
}
:deep(.van-cell__title){
  width: 80px;
}
:deep(.van-image){
  width: 100px;
  height: 100px;
}
:deep(.van-uploader__preview){
  margin: 0;
}
.van-form{
  height: 100%;
  background-color: #fff;
  position: relative;
   padding-bottom: 80px;

  .footer{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    .van-button{
      border-radius: 6px;
    }
    .van-button--default{
      margin-left: 20px;
      border: 1px solid #096DD9;
      color: #096DD9;
    }
  }
}
</style>
