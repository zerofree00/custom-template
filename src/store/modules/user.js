// import { setStore, getStore, removeStore } from '@/util'
import { getStore } from '@/util';
// import { getUserDetail } from '@/api'

const user = {
    namespaced: true, // 命名空间,
    state: {
        token: getStore('useMessage') ? getStore('useMessage') : '',
        role: getStore('useRole') ? parseInt(getStore('useRole')) : 0,
        newrouter: [],
        userId: getStore('userId') ? parseInt(getStore('userId')) : '',
        userMessage: ''
    },
    mutations: {
    // 新增token
        SETTOKEN(state, params) {
            state.token = params;
        },
        // 新增权限
        SETROLE(state, params) {
            state.role = params;
        },
        // 新增路由
        SETNEWROUTER(state, params) {
            state.newrouter = params;
        },
        // 新增userId
        SETUSERID(state, params) {
            state.userId = params;
        },

        // 删除token
        DELLTOKEN(state) {
            state.token = '';
        },
        // 删除权限
        DELLROLE(state) {
            state.role = 0;
        },
        // 删除路由
        DELLROUTER(state) {
            state.newrouter = [];
        },

        // 删除userid
        DELLUSERID(state) {
            state.userId = '';
        },

        // 获取用户信息
        GETUSERDET(state, params) {
            state.userMessage = params;
        }

    }
};

export default user;
