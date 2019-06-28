import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/components/login'; // 登录页面

import store from '@/store';

Vue.use(Router);

// 默认路由
const defaultRouter = [
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];

const router = new Router({
    routes: defaultRouter
});

router.beforeEach((to, from, next) => {
    let token = store.getters.user;
    if (token) {
    // 判断用户是否存在(用户存在)
        console.log('用户存在');
    } else {
    // 用户不存在

        console.log('用户不存在');

        if (to.path === '/login') {
            next();
        } else {
            next({ name: 'login' });
        }
    }
});

export default router;
