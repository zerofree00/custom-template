import axios from './index';

export const apiList = (data) => axios.post('/api/wage/detail', data);
