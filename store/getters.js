const getters = {
	token: state => {
		return state.user.token;
	}, 
	user_id: state => {
		return state.user.user_id;
	},
	// 所有订单状态
	orderStatusObj: state => {
		return state.all.orderStatusObj;
	},
	// 所有订单状态 颜色
	orderStatusColorObj: state => {
		return state.all.orderStatusColorObj;
	},
	// 所有订单删除按钮显示
	orderDeleteObj: state => {
		return state.all.orderDeleteObj;
	},
	// 法律文件
	lawTypeObj: state => {
		return state.all.lawTypeObj;
	},

};

export default getters;
