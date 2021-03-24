import axios from './index';

// 列表
export const apiList = (data) => axios.post('/api/assets/assetsList', data);

// 详情
export const apiDetail = (data) => axios.post('/api/assets/detail', data);

// 删除
export const apiDelete = (data) => axios.post('/api/assets/delete', data);

// 审核
export const apiDoCheckHandler = (data) =>
    axios.post('/api/assets/doCheckHandler', data);

// 论坛评论 相关接口
export const detailAllApi = {
    apiDetail: apiDetail,
    apiDelete: apiDelete,
    apiDoCheckHandler: apiDoCheckHandler,
};
