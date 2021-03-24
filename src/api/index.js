import axios from 'axios';
import qs from 'qs';
import { apiBaseUrl, websvrpwd } from '@/config';
import router from '../router/index';
const validateStatus = (status) => {
    return status >= 200 && status < 300;
};

import { Toast } from 'vant';

// 创建时自定义默认配置，超时设置为全局默认值0秒
let axiosNew = axios.create({
    baseURL: apiBaseUrl,
    timeout: 600000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-requested-with': 'XMLHttpRequest',
    },
    validateStatus: validateStatus,
});

let axiosPromiseArr = [];
// http request 拦截器
axiosNew.interceptors.request.use(
    (config) => {
        // console.log('config====', config);
        config.cancelToken = new axios.CancelToken((cancel) => {
            axiosPromiseArr.push({
                cancel,
            });
        });

        const _strSid = localStorage.getItem('strSid');

        if (config.data instanceof Object) {
            config.data.strSid = config.data.strSid || _strSid;
            config.data.websvrpwd = config.data.websvrpwd || websvrpwd;
        } else {
            config.data = {};
            config.data.strSid = config.data.strSid || _strSid;
            config.data.websvrpwd = websvrpwd;
        }

        if (
            config.method === 'post' &&
            config.headers['Content-Type'] != 'multipart/form-data'
        ) {
            config.data = qs.stringify(config.data);
        }

        if (config.data instanceof FormData) {
            config.data.append('websvrpwd', websvrpwd);
            if (!config.data.get('strSid')) {
                config.data.append('strSid', _strSid);
            }
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// http request 拦截器
axiosNew.interceptors.response.use(
    (resp) => {
        if (!resp.data || resp.data.constructor != Object) {
            Toast.fail('接口有误');
            return Promise.reject('wrong');
        }
        if (resp.data.constructor == Object) {
            resp.data.strMsg =
                resp.data.strMsg || '操作失败' + resp.data.intCode;

            let { intCode, strMsg } = resp.data;
            if (!validateStatus(intCode) && intCode !== undefined) {
                Toast.fail(strMsg);
                //返回错误状态
                // return Promise.reject('wrong');
            }
            if (resp.data.globa_sessionTimeOut == -1) {
                Toast.fail(resp.data.tip);
            }
        }

        setTimeout(() => {
            Toast.clear();
        }, 1000);
        return resp;
    },
    () => {
        if (axiosPromiseArr.length) {
            Toast.fail('网络异常\n请稍后重试');
            // Toast.clear();
        }
        axiosPromiseArr = [];
        return Promise.reject('wrong');
    }
);

router.beforeEach((to, from, next) => {
    axiosPromiseArr.forEach((ele, index) => {
        ele.cancel();
        delete axiosPromiseArr[index];
    });
    next();
});

export default axiosNew;
