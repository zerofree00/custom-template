/*
 * Created Date: Monday June 3rd 2019
 * Author: lugusliu
 * Copyright (c) 2019 doBell
 * HISTORY:
 */
import axios from 'axios';
import store from '@/store';
import { refreshToken } from '@/utils/api';
import { Notification } from 'element-ui';
import { removeEmpty } from '@/utils';

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 30000,
});

// 设置重试次数和重试延时
service.defaults.retry = 4;
service.defaults.retryDelay = 500;

// 423 重试次数计数
let hasRetryCount = 0;

// 请求 - 拦截器
service.interceptors.request.use(
    (config) => {
        config.headers['group'] = 1;
        config.headers['type'] = 'pc';
        config.headers['version'] = '1.0';
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        // 登录状态需在请求头中带上 token
        if (store.getters.token) {
            config.headers.result = store.getters.token;
        }
        // 选择团队后需要在请求头中带上 team
        if (store.getters.unitCode) {
            config.headers.team = store.getters.unitCode;
        }

        config.data = removeEmpty(config.data);

        return config;
    },
    (error) => {
        // 发送的请求出错，直接报错
        console.log('requset', error);
        return Promise.reject(error);
    }
);

// 响应 - 拦截器
service.interceptors.response.use(
    (response) => {
        // 响应头中包含 result，说明当前环境中的 Token 已过期，用响应头中的替换
        if (response.headers.result) {
            store.dispatch('SetUserToken', response.headers.result);
            hasRetryCount = 0;
        }

        // 200，响应成功，返回后端数据
        if (response.data.status === 200) {
            hasRetryCount = 0;
            return Promise.resolve(response.data);
        } else if (response.data.status === 423) {
            // 423，此次请求所携带 Token 已超时，新 Token 已被上一条请求获取，环境 Token 已更新（但此次请求是在更新前和上次请求一起发送的，所以是老的 Token），重发此次请求即可
            // 记录重发请求的次数
            hasRetryCount += 1;
            const tempConfig = response.config;

            // 请求次数超过了默认值 4 次，则手动更新 token，并更新本地环境中的 token
            if (hasRetryCount > service.defaults.retry) {
                hasRetryCount = 0;
                return refreshToken().then((res) => {
                    // tempConfig.headers.result = res;
                    store.dispatch('SetUserToken', res);
                    return service(tempConfig);
                });
            }

            // 延迟 500ms 重发之前失败的 423 请求
            // Create new promise to handle exponential backoff
            const backoff = new Promise(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, service.defaults.retryDelay);
            });

            // Return the promise in which recalls axios to retry the request
            return backoff.then(function () {
                return service(tempConfig);
            });
        } else {
            return Promise.reject(response.data);
        }
    },

    (err) => {
        // console.log('**err.config**', err.config);
        // console.log('**err.response**', err.response);
        if (!err.response) {
            Notification.error({
                title: '502',
                message: '抱歉服务器出现错误，正在跳转至主页',
                duration: 3000,
                // showClose: false,
                // onClose: () => {
                //   window.location.replace(window.location.origin);
                // },
            });
            return Promise.reject('502 (Bad Gateway)');
        } else if (
            err.response.status == 400 ||
            err.response.status == 403 ||
            err.response.status == 404 ||
            err.response.status == 410
        ) {
            Notification.error({
                title: '',
                message: `${err.response.data.prompt}`,
                duration: 2000,
            });
            return Promise.reject(err.response.data.msg);
        } else if (err.response.status == 401) {
            // 登录超时或者令牌出错，返回登录页
            window.sessionStorage.clear();
            store.dispatch('SetUserToken', '');
            store.dispatch('SetUnitBase', { unitCode: null, unitName: '' });
            window.localStorage.clear();
            Notification.warning({
                title: '',
                message: '登录超时，请重新扫码登录',
                duration: 2000,
                showClose: false,
                onClose: () => {
                    window.location.replace(process.env.LoginUrl);
                },
            });
        } else {
            Notification.error({
                title: '错误',
                message: `系统出了些小问题，请刷新重试或联系系统管理员`,
                duration: 2000,
            });
            return Promise.reject('Interceptors Response Error');
        }
    }
);

export default service;
