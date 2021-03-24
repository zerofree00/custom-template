// 督办 相关接口
import axios from './index';

// 列表接口
export const superviseList = (data) =>
    axios.post('/api/oversee/overseeList', data);

//  提醒
export const superviseRemindAPi = {
    userList: (data) => axios.post('/api/oversee/getReUserList', data),
    sendData: (data) => axios.post('/api/oversee/overseeDing', data),
};

// 取消督办
export const superviseDelete = (data) =>
    axios.post('/api/oversee/cancelOversee', data);

// 督办
export const superviseOversee = (data) =>
    axios.post('/api/oversee/oversee', data);

// 督办信息
export const superviseInfo = (data) =>
    axios.post('/api/oversee/overseeDetailList', data);

// 新建督办的id
export const getIdApi = (data) =>
    axios.post('/api/oversee/getOverseeBaseInfo', data);
