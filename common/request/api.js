// 引入文件
import request from './request.js';

// 设置全局参数
request.setConfig({
	url: "https://wx.51laladui.com:9003", // 基地址,  可选
	// url: "http://192.168.0.121:8082", // 夏
	// url: "http://192.168.0.112:8082", // 陶
	dataType: "json", // 传参方式, 可选
	header: { // 请求头, 可选
		"content-type": "application/json"
		// token: "xxxx"
	}
});

/**
 * @description: 请求拦截器
 * @param {object} 当前请求配置参数
 * @return 不return对象，则不发送当前请求
 */
request.interceptors.request(config => {
	return config;
});

/**
 * @description: 响应拦截器
 * @param {object} 当前请求成功回调数据
 * @return 不return对象，则不返回数据
 */
request.interceptors.response(res => {
	return res;
});

module.exports = {
	request,
	// 修改昵称
	editnicknameapi(apidata) {
		return new Promise(function(resolve, reject) {
			request
				.post({
					url: "/editUserNickName",
					data: apidata,
				})
				.then(res => {
					resolve(res.data)
				})
				.catch(err => {
					reject(err)
				})

		})

	},
}
