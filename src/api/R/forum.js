/*
 * @Author: your name
 * @Date: 2020-12-22 11:48:32
 * @LastEditTime: 2021-02-25 11:08:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \r_oa6_app\src\api\R\forum.js
 */
// 论坛 相关接口
import axios from './index';

// 列表接口
export const getPageListApi = (data) =>
    axios.post('/api/BBS/invitationList', data);

// 获取论坛模块
export const getTabsApi = (data) => axios.post('/api/BBS/tabs', data);

//我的帖子
export const myInvitationListApi = {
    list: (data) => axios.post('/api/BBS/myInvitation', data),
    delete: (data) => axios.post('/api/BBS/deleteInvitation', data),
};

//我的帖子
export const addForumApi = (data) => axios.post('/api/BBS/addInvitation', data);

// 详情
export const getPageDetailApi = (data) =>
    axios.post('/api/BBS/invitationDetails', data);

// 编辑
export const editApi = (data) => axios.post('/api/BBS/editInvitation', data);

//删除
export const superviseGetInfoDelete = (data) =>
    axios.post('/api/recDoc/delete', data);

//  提醒
export const superviseRemindAPi = {
    add: (data) => axios.post('/api/email/add', data),
    sendData: (data) => axios.post('/api/email/addAct', data),
};
//  系统消息列表
export const systemMessageAPi = {
    list: (data) => axios.post('/api/BBS/myMessage', data),
    delete: (data) => axios.post('/api/BBS/deleteMessage', data),
    isRead: (data) => axios.post('/api/BBS/readMessage', data),
    detail: getPageDetailApi,
};

// 论坛评论 相关接口
export const commentListApi = {
    // 一级评论列表
    list: (data) => axios.post('/api/BBS/commentList', data),
    // 二级评论列表
    lowerLevelList: (data) => axios.post('/api/BBS/childCommentList', data),
    // 评论回复
    addAndReply: (data) => axios.post('/api/BBS/addComment', data),
    // 点赞
    dig: (data) => axios.post('/api/BBS/dig', data),
    // 评论删除
    delete: (data) => axios.post('/api/BBS/deleteComment', data),
    // 单个评论详情
    commentDetails: (data) => axios.post('/api/BBS/commentDetails', data),
};
// 新建 的id
export const getIdApi = (data) =>
    axios.post('/api/BBS/getInvitationBaseInfo  ', data);
