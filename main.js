import Vue from 'vue'
import App from './App'

import store from './store'

import apis from '@/common/request/api.js';
Vue.prototype.$apis = apis;
Vue.prototype.$request = apis.request;

/**
 * 引用方式
 this.$request
 	.post({
 		url: "/findGoodsType",
 		data: {},
 	})
 	.then(res => {
 		console.log('成功=',res.data)
 	})
 	.catch(res => {
 		console.log('失败=',res)
 	});
 * **/

Vue.config.productionTip = false
Vue.prototype.$store = store;
App.mpType = 'app'


const app = new Vue({
	store,
	...App
})
app.$mount()
