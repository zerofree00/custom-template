/*
 * @Author: your name
 * @Date: 2020-12-22 11:48:32
 * @LastEditTime: 2021-03-18 10:45:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \r_oa6_app\src\config\index.js
 */
let apiUrl = '/apis';
// let   apiUrl = '/api131';
//  let  apiUrl = '/api28'; // 吕欣
// let apiUrl = '/api144'; // 张丽

if (process.env.NODE_ENV == 'production') {
    apiUrl = '/apis';
}

// 此配置，再public/static/config.js
if (window.apiObj.apiUrl) {
    apiUrl = window.apiObj.apiUrl;
}
