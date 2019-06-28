const getters = {
    user: state => {
        return state.user.token;
    }, // 用户token
    role: state => {
        return state.user.role;
    }, // 用户权限
    userId: state => {
        return state.user.userId;
    }, // 用户userId
    newrouter: state => {
        return state.user.newrouter;
    }, // 用户路由表
    orderAllData: state => {
        return state.select.orderAllData;
    }, // 工单数据
    checkAllData: state => {
        return state.select.checkAllData;
    }, // 巡检单数据
    urgentOptions: state => {
        return state.select.urgentOptions;
    }, // 紧急状态
    categoryOptions: state => {
        return state.select.categoryOptions;
    }, // 工单类别数据
    stateOptions: state => {
        return state.select.stateOptions;
    }, // 工单状态数据
    userMessage: state => {
        return state.user.userMessage;
    }, // 个人中心数据
    setTime: state => {
        return state.select.setTime;
    }, // 下拉加载时间
    adminValues: state => {
        return state.select.adminValues;
    }, // 显示工单还是巡检
    selectData2: state => {
        return state.select.selectData2;
    }, // 不是行政人员的选择条件数据
    selectDataCheck: state => {
        return state.select.selectDataCheck;
    } // 巡检的条件查询条件数据

};

export default getters;
