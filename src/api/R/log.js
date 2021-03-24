import axios from './index';

// 列表
export const apiList = (data) => axios.post('/api/logs/logList', data);

// 新增
export const apiAdd = (data) => axios.post('/api/logs/addLogs', data);

// 详情
export const apiDetail = (data) => axios.post('/api/logs/logsDetail', data);

// 获取日志类型
export const getTabsApi = (data) => axios.post('/api/logs/logTypes', data);

// 编辑页的操作
export const apiHandleApi = {
    detail: apiDetail,
    add: (data) => axios.post('/api/logs/addLogs', data),
    edit: (data) => axios.post('/api/logs/editLogs', data),
};

// 写评语
export const logsCommentApi = {
    add: (data) => axios.post('/api/logs/addLogsComment', data),
    list: (data) => axios.post('/api/logs/getLogsComment', data),
    delete: (data) => axios.post('/api/logs/delLogsComment', data),
};
