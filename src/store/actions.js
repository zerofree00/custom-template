import { login } from '@/api';
import { setStore, getStore, removeStore } from './../util';

const actions = {
    // 登陆
    login({ commit }, info) {
        return new Promise((resolve, reject) => {
            // let data = {};
            login(info, res => {
                commit('user/SETTOKEN', res.data.token);
                setStore('useMessage', res.data.token);
                commit('user/SETROLE', res.data.user.role_id);
                setStore('useRole', res.data.user.role_id);
                commit('user/SETUSERID', res.data.user.id);
                setStore('userId', res.data.user.id);
                resolve(res);
            });
        });
    },
    // 登出
    loginOut({ commit }) {
        return new Promise((resolve, reject) => {
            commit('user/DELLTOKEN');
            removeStore('useMessage');
            commit('user/DELLROLE');
            removeStore('useRole');
            commit('user/DELLROUTER');
            removeStore('userId');
            commit('user/DELLUSERID');
            resolve();
        });
    },

    // 注入路由
    role({ commit }, newrouter) {
        return new Promise((resolve, reject) => {
            commit('user/SETNEWROUTER', newrouter);
            resolve(newrouter);
        });
    },
    // 个人中心信息 GETUSERDET
    getUserMes({ commit }, params) {
        commit('user/GETUSERDET', params);
    },

    // 设置工单数据
    getordersdata({ commit }, params) {
        commit('select/GETORDERSDATA', params);
    },
    // 设置巡检数据
    getcheckedata({ commit }, params) {
        commit('select/GETCHECKEDATA', params);
    },
    // 设置全局adminValues
    setadminValues({ commit }, params) {
        commit('select/SETADMINOPTION', params);
    },
    // 设置全局adminValues
    setselectdata2({ commit }, params) {
        commit('select/SETSELECTDATA2', params);
    },
    // 设置全局setcheckselect
    setcheckselect({ commit }, params) {
        commit('select/SETCHECKSELECT', params);
    }
};

export default actions;
