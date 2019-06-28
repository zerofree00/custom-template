/**
 * 作用：对axios数据请求插件进一步封装
 * 前端只需要传参数，拿结果即可
 */

import servers from './server';
// import config from './../config'

function Get(url, par) {
    par = par || '';
    return new Promise(function(resolve, reject) {
        servers
            .GetMethods(url, par)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function Post(url, par) {
    par = par || '';
    return new Promise(function(resolve, reject) {
        servers
            .PostMethods(url, par)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function Postfile(url, par, timeout) {
    par = par || '';
    return new Promise(function(resolve, reject) {
        servers
            .Postfile(url, par, timeout)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export { Get, Post, Postfile };
