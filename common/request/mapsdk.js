import QQMapWX from '../utils/qqmap-wx-jssdk.js';

// 实例化API核心类
var qqmapsdk = new QQMapWX({
	key: 'P3GBZ-F3Q3O-I72WV-S6GGN-ZSNHV-BTBSD' // 必填
});

var mapsdk = {
	// 地图api调用地址解析接口 (根据地址，解析城市)
	_geocoder(cityName) {
		//调用地址解析接口
		return new Promise(function(resolve, reject) {
			qqmapsdk.geocoder({
				//获取表单传入地址
				address: cityName,
				success: function(res) {
					//成功后的回调
					resolve(res)
				},
				fail: function(error) {
					reject(error);
				},
				complete: function(res) {
					// console.log(res);
				}
			});

		})
	},
	// 地图 (根据经纬度获取城市)
	_reverseGeocoder(locationdata) {
		return new Promise(function(resolve, reject) {
			qqmapsdk.reverseGeocoder({
				location: locationdata,
				success: function(res) {
					resolve(res)
				},
				fail: function(err) {
					reject(err)
				},
				complete: function(res) {
					// console.log(res);
				}
			});

		})
	},
};
export default mapsdk;
