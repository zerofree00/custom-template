import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		loginProvider: "",
		openid: null,
		hxl_UserMess: uni.getStorageSync('hxl_UserMess') ? uni.getStorageSync('hxl_UserMess') : null,
		user_id: uni.getStorageSync('user_id') ? uni.getStorageSync('user_id') : null,
		mycity: uni.getStorageSync('mycity') ? uni.getStorageSync('mycity') : '北京',
		myLocation: uni.getStorageSync('myLocation') ? uni.getStorageSync('myLocation') : '39.9088230000,116.3974700000',
		qqmapKey: 'P3GBZ-F3Q3O-I72WV-S6GGN-ZSNHV-BTBSD',
		GoodsTypeList: null,
		PackageTypeList: null,
		throttle_time: 3000,
		webviewurl_pay: 'https://www.51laladui.com/', // 支付相关页面
		webview_page: 'https://www.51laladui.com/', // 详情
		// 所有订单状态
		orderStatusObj: {
			0: '待接单',
			1: '待揽件',
			2: '待付款',
			3: '待发货',
			4: '配载中',
			5: '运输中',
			6: '待签收',
			7: '已签收',
			8: '已取消',
			9: '被拒绝',
			10: '接单超时',
			11: '揽件超时',
			12: '异常终止'
		},
		// 所有订单状态 颜色
		orderStatusColorObj: {
			0: '',
			1: '',
			2: '',
			3: '',
			4: '',
			5: '',
			6: '',
			7: '',
			8: '',
			9: '',
			10: 'colorRed',
			11: 'colorRed',
			12: 'colorRed'
		},
		// 所有订单删除按钮显示
		orderDeleteObj: {
			0: 0,
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0,
			6: 0,
			7: 1,
			8: 1,
			9: 1,
			10: 1,
			11: 1,
			12: 1
		},
		lawTypeObj: {
			1: '拉拉队用户服务协议',
			2: '支付服务协议',
			3: '拉拉队隐私政策',
			4: '拉拉队寄件服务条款'
		},
	},
	mutations: {
		setloginState(state, provider) {
			state.user_id = provider.id;
			state.hxl_UserMess = provider;
			uni.setStorageSync('user_id', provider.id);
			uni.setStorageSync('hxl_UserMess', provider);
		},
		logout(state) {
			state.user_id = null;
			state.hxl_UserMess = null;
			uni.removeStorageSync('user_id');
			uni.removeStorageSync('hxl_UserMess');
		},
		// 设置货物类型
		setGoodsTypeList(state, GoodsTypeList) {
			state.GoodsTypeList = GoodsTypeList
		},
		// 设置包装方式
		setPackageTypeList(state, PackageTypeList) {
			state.PackageTypeList = PackageTypeList
		},
		// 设置全局城市
		setmycity(state, mycity) {
			uni.setStorageSync('mycity', mycity);
			state.mycity = mycity
		},
		// 设置全局城市坐标
		setmyLocation(state, myLocation) {
			uni.setStorageSync('myLocation', myLocation);
			state.myLocation = myLocation
		},
	},
	actions: {
		// lazy loading openid
		getUserOpenId: async function({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function() { //模拟异步请求服务器获取 openid

								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	}
})

export default store
