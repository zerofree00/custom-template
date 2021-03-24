import axios from './index';

// 列表
export const apiList = (data) => axios.post('/api/duty/dutyList', data);

// 获取时间段
export const getTimeRangeApi = (data) =>
    axios.post('/api/duty/getDutyTableTimes', data);

// 值班记录列表
export const getListApi = {
    detail: (data) => axios.post('/api/duty/dutyLogsDetail', data),
    list: (data) => axios.post('/api/duty/dutyLogsList', data),
};
// 编辑页的操作
export const handleApi = {
    add: (data) => axios.post('/api/duty/addDutyLogs', data),
    timeRange: getTimeRangeApi,
};
