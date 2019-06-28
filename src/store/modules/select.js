const select = {
    namespaced: true, // 命名空间
    state: {
        orderAllData: '',
        checkAllData: '',
        urgentOptions: '', // 紧急程度数据
        categoryOptions: '', // 工单类别数据
        stateOptions: '', // 工单状态数据
        setTime: 0,
        adminValues: 'adminOPtions1',
        selectData2: {
            startDate: '',
            endDate: '',
            emergency: '',
            project: '',
            status: ''
        },
        selectDataCheck: {
            allocationId: '',
            areaId: '',
            schoolId: '',
            status: '',
            startTime: '',
            endTime: ''
        }

    },
    mutations: {
        GETORDERSDATA(state, params) {
            state.orderAllData = params;
        },
        GETCHECKEDATA(state, params) {
            state.checkAllData = params;
        },
        URGENTSTOP(state, params) {
            state.urgentOptions = params;
        },
        CATEGORYOP(state, params) {
            state.categoryOptions = params;
        },
        STATEOP(state, params) {
            state.stateOptions = params;
        },
        // 设置全局adminOPtions1
        SETADMINOPTION(state, params) {
            state.adminValues = params;
        },
        // 设置全局select数据
        SETSELECTDATA2(state, params) {
            state.selectData2 = params;
        },
        // 设置全局巡检选择数据
        SETCHECKSELECT(state, params) {
            state.selectDataCheck = params;
        }
    }
};

export default select;
