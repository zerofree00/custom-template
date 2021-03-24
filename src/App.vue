<!--
 * @Author: your name
 * @Date: 2021-03-16 10:37:15
 * @LastEditTime: 2021-03-18 17:57:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\VUE3\temp\h5-less\src\App.vue
-->
<template>
    <div id="nav">
        <router-link to="/">Home</router-link>
        <van-cell value="内容" is-link>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <span class="custom-title">单元格</span>
                <van-tag type="danger">标签</van-tag>
            </template>
        </van-cell>

        <van-cell title="单元格" icon="shop-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
                <van-icon name="search" class="search-icon" />
            </template>
        </van-cell>
    </div>
    <router-view />
</template>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 20px;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
