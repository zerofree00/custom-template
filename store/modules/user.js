const user = {
	// namespaced: true, // 命名空间,
	state: {
		hasLogin: false,
		loginProvider: "",
		openid: null,
		hxl_UserMess: uni.getStorageSync('hxl_UserMess') ? uni.getStorageSync('hxl_UserMess') : null,
		user_id: uni.getStorageSync('user_id') ? uni.getStorageSync('user_id') : null,
		mycity: uni.getStorageSync('mycity') ? uni.getStorageSync('mycity') : '北京',
		myLocation: uni.getStorageSync('myLocation') ? uni.getStorageSync('myLocation') : '39.9088230000,116.3974700000',
		GoodsTypeList: null,
		PackageTypeList: null,
		throttle_time: 3000,
		webviewurl_pay: 'https://www.51laladui.com/', // 支付相关页面
		webview_page: 'https://www.51laladui.com/', // 详情
	},
	mutations: {
		// 设置登陆本地缓存
		SETLOGINSTATE(state, provider) {
			state.user_id = provider.id;
			state.hxl_UserMess = provider;
			uni.setStorageSync('user_id', provider.id);
			uni.setStorageSync('hxl_UserMess', provider);
		},
		// 修改本地缓存
		EDITUSERMES(state, provider) {
			state.hxl_UserMess = provider;
			uni.setStorageSync('hxl_UserMess', provider);
		},
		// 设置货物类型
		SETGOODSTYPELIST(state, GoodsTypeList) {
			state.GoodsTypeList = GoodsTypeList
		},
		// 设置包装方式
		SETPACKAGETYPELIST(state, PackageTypeList) {
			state.PackageTypeList = PackageTypeList
		},
		// 设置全局城市
		SETMYCITY(state, mycity) {
			uni.setStorageSync('mycity', mycity);
			state.mycity = mycity
		},
		// 设置全局城市坐标
		SETMYLOCATION(state, myLocation) {
			uni.setStorageSync('myLocation', myLocation);
			state.myLocation = myLocation
		},
		// 退出清空所有
		LOGINOUT(stata) {
			state.user_id = null;
			state.hxl_UserMess = null;
			uni.clearStorage();
		},
	}
};

export default user;
