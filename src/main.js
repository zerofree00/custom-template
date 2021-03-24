/*
 * @Author: your name
 * @Date: 2021-03-16 10:37:15
 * @LastEditTime: 2021-03-18 17:54:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\VUE3\temp\h5-less\src\main.js
 */
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'amfe-flexible';

import Vant from 'vant';
import 'vant/lib/index.css';

createApp(App)
    .use(store)
    .use(router)
    .use(Vant)
    .mount('#app');
