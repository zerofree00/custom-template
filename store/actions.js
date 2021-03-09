const actions = {
	// 登出
	loginOut({
		commit
	}) {
		return new Promise((resolve, reject) => {
			commit('user/LOGINOUT');
			resolve();
		});
	},
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
	},

};

export default actions;
