<template>
  <div class="login-box">
    <i
      class="iconfont icon-guan close"
      @click="closeLogin"
    />
    <img
      src="@/assets/images/zxlogo.png"
      alt=""
    >
    <van-form @submit="onSubmit">
      <van-cell>
        <van-field
          v-model="username"
          name="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        >
          <template #button>
            <i
              @click="username = ''"
              class="iconfont icon-X"
            />
          </template>
        </van-field>
      </van-cell>
      <van-cell>
        <van-field
          v-model="password"
          :type="passwordType"
          name="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        >
          <template
            #button
          >
            <div class="forget-password">
              <span>
                <i
                  v-show="passwordType === 'password'"
                  class="iconfont icon-guanbi"
                  @click="updatePasswordType('text')"
                />
                <i
                  v-show="passwordType === 'text'"
                  class="iconfont icon-dakai"
                  @click="updatePasswordType('password')"
                />
              </span>
              <span class="forget">忘记密码</span>
            </div>
          </template>
        </van-field>
      </van-cell>
      <van-button
        round
        block
        type="primary"
        :loading="loading"
        native-type="submit"
        loading-text="正在登录..."
        :disabled="loading"
      >
        登录
      </van-button>
      <p>账号密码登录</p>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { login, getOrg } from '@/api/login'
import { FieldType, Toast } from 'vant'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { encrypt } from '@/utils/utils'
const username = ref('')
const password = ref('')
const loading = ref(false)
const store = useStore()
const router = useRouter()
const onSubmit = async () => {
  loading.value = true
  try {
    const { id } = await getOrg('hbszx-web')
    const res = await login({
      // loginName: username.value,
      // password: password.value,
      loginName: encrypt(username.value),
      password: encrypt(password.value),
      rootId: id
    })
    store.commit('setUserInfo', res)
    Toast.success('登录成功！')
    loading.value = false
    router.replace('/index')
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}
store.commit('setUserInfo', {})
const passwordType = ref<FieldType>('password')
const updatePasswordType = function (val:FieldType) {
  passwordType.value = val
}

const closeLogin = function () {
  router.replace('/index/home')
}

</script>

<style lang="scss" scoped>
.login-box{
  position: relative;
  font-size: 14px;
  overflow: hidden;
  .close{
    position: absolute;
    top: 12px;
    left: 24px;
  }
  >img{
    display: block;
    margin: 0 auto;
    width: 80px;
    margin-top: 96px;
    margin-bottom: 49px;
  }
}
.van-form{
  padding: 0 24px;
}
.icon-X{
  color:#BFBFBF;
  font-size: $font-size-12px;
}
::v-deep .van-field__control{
  font-size: $font-size-16px;

}
.icon-guanbi{
  font-size: 0.08rem;
  color:#BFBFBF;
}
.icon-dakai{
  color:#BFBFBF;
}
.forget{
  font-size: $font-size-14px;
  color: #666666;
  margin-left: 12px;

  &::before{
    content: '';
    width: 1px;
    height: 14px;
    background-color: #dcdcdc;
    display: inline-block;
    margin-right: 12px;
    position: relative;
    top: 2px;
  }
}
.forget-password{
  display: flex;
  align-items: center;
   line-height: 1;
}
.van-button{
  font-size: $font-size-16px;
  border-radius:$border-radius;
  margin-top: 52px;
}
.van-button + p {
  font-size: $font-size-14px;
  margin-top: 24px;
  text-align: center;
  color: $text-color-gary1;
}
</style>
