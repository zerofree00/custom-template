import axios from './index';

// 列表
export const apiList = (data) => axios.post('/api/goOut/goOutList', data);

// 详情
export const apiDetail = (data) => axios.post('/api/goOut/detail', data);

// 详情
export const apiDelete = (data) => axios.post('/api/goOut/delete', data);
