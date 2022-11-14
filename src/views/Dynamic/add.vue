<template>
  <Layout
    title="读书动态新增"
    :is-padding="false"
  >
    <template #header />
    <van-form>
      <van-field
        v-model="value"
        label="标题"
        placeholder="标题"
      />
      <van-field
        v-model="value"
        label="发布人"
        placeholder="发布人"
        readonly
        is-link
      />
      <h2>正文内容</h2>
      <Editor content="111" />
      <h2>添加附件</h2>
      <van-field
        class="uploader_box"
        name="uploader"
      >
        <template #input>
          <van-uploader
            multiple
            v-model="uploaderImg"
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </Layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Editor from '@/components/Editor/index.vue'
// import { useRoute } from 'vue-router'
// import { databaseDetail } from '@/api/experience'
// import FileList from '@/components/FileList/index.vue'
// 获取详情
// const route = useRoute()
const value = ref('')
const uploaderImg = ref([])
// const id: string = route.params.id as string
// databaseDetail(id).then(res => {
//   Object.assign(data, res)
// })
// const type = ['', '报告', '讲话', '解读', '政策']
// const onSubmit = (values) => {
//   console.log('submit', values)
// }
</script>

<style lang="scss" scoped>
h2{
  font-size: 14px;
  font-weight: 400;
  padding: 10px;
}
</style>
