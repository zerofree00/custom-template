<template>
  <div class="download-body">
    <div class="btn-box">
      <a href="itms-services://?action=download-manifest&url=https://ios.bagcloud.cn/app/zx_pro_lnzx/lnszx.plist">
        <div class="btn">
          <img
            src="../../assets/images/ios.png"
            alt=""
          >
          iPhone下载
        </div>
      </a>
      <a href="http://221.180.204.131:8050/lnszx.apk">
        <div class="btn">
          <img
            src="../../assets/images/Android.png"
            alt=""
          >
          Android下载
        </div>
      </a>
    </div>
    <div class="footer" />
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.download-body{
width: 100%;
height: 100%;
background: url('../../assets/images/iphone_bj.jpg') no-repeat center center;
background-size: 100% 100%;
.footer{
  background: url('../../assets/images/bt.png') no-repeat center center;
background-size: 100% 100%;
position: fixed;
bottom:0;
left: 0;
width: 100%;
height: 40px;
}
.btn-box{
width: 100%;
padding: 0 50px;
position: fixed;
bottom:6%;
left: 0;
.btn{
  width: 100%;
  background-color: #096DD9;
  color: #fff;
  font-size: 20px;
  text-align: center;
line-height: 45px;
height: 45px;
margin-bottom: 25px;
border-radius: 25px;
img{
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
}
}
}
</style>
