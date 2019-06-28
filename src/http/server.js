/**
 * 作用：负责发送ajax请求
 */
import config from './../config';
import axios from 'axios';
import store from '@/store';
import qs from 'qs';
// import router from '@/router'

var instance = axios.create(config.httpConfig);

// 请求拦截
instance.interceptors.request.use(httpConfig => {
    if (store.getters.user) {
        // httpConfig.url = httpConfig.url + '?token=' + store.getters.user;

        // httpConfig.headers.AuthorizationToken = store.getters.user;
        // 全局token
        httpConfig.params = Object.assign({}, httpConfig.params, {
            token: store.getters.user
        });
    }
    // console.log(httpConfig);
    return httpConfig;
});

// 响应拦截
instance.interceptors.response.use(
    response => {
        var that = this;
        let data = response.data;
        /*        if (data.status == -2) {

            return Promise.reject(response);
        } else if (data.status == -1) {
            Message.alert(data.message, '友情提示');

            return Promise.reject(response);
        } */

        return response;
    },
    error => {
        console.error(error);
        return Promise.reject(error);
    }
);

export default {
    GetMethods(url, par) {
        // par = Object.assign(config.publicParams,par)
        return new Promise(function(resolve, reject) {
            instance.defaults.headers.post['Content-Type'] = 'application/json';
            instance
                .get(url, par)
                .then(success => {
                    resolve(success.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    Postfile(url, par, timeout) {
        return new Promise(function(resolve, reject) {
            instance.defaults.headers.post['Content-Type'] = 'application/json';
            instance
                .post(url, par, { timeout: timeout })
                .then(success => {
                    resolve(success.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    PostMethods(url, par) {
        return new Promise(function(resolve, reject) {
            instance.defaults.headers.post['Content-Type'] = 'application/json';
            instance
                .post(url, par)
                .then(success => {
                    resolve(success.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },

};
