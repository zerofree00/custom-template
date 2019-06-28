/**
 * axios
 */
// import { Get, Post, All } from './../http'
import { Get, Post } from './../http';
// import store from '@/store'

const api = '/api';

// const api = window.g.ApiUrl;

// 用户登录
export let login = (member, cb) => {
    Post(
        `${api}/user/login`,
        {
            account: member.username,
            password: member.password
        },
        false,
        res => {
            cb(res);
        }
    );
};

// 修改密码 POST /api/user/updatePassword
export let reset = (member, cb) => {
    Post(`${api}/user/updatePassword`, member, false, res => {
        cb(res);
    });
};
