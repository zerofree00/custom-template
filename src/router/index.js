/*
 * @Author: your name
 * @Date: 2021-03-16 10:37:15
 * @LastEditTime: 2021-03-18 09:56:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \project\VUE3\temp\h5-less\src\router\index.js
 */
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
