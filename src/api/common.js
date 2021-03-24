/*
 * @Author: your name
 * @Date: 2021-03-18 15:46:04
 * @LastEditTime: 2021-03-18 16:21:00
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \project\VUE3\temp\h5-less\src\api\common.js
 */
// 公共接口
import axiosNew from '@/api/index';

export const affixcommon = (data) => axiosNew.post('/api/affix/list', data); //附件列表
