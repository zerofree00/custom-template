/*
 * Created Date: Saturday June 22nd 2019
 * Author: lugusliu
 * Copyright (c) 2019 doBell
 * HISTORY:
 */
let oss = require('ali-oss');

export default {
  /**
   * 生成随机字符串
   * @param {number} len
   * @returns {string}
   */
  randomString(length) {
    let len = length || 32;
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let maxPos = chars.length;
    let res = '';
    for (let i = 0; i < len; i++) {
      res += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return res;
  },

  /**
   * 创建oss客户端对象
   * @return {*}
   */
  createOssClient() {
    return new Promise(resolve => {
      let client = new oss({
        region: 'oss-cn-beijing',
        accessKeyId: 'LTAIAl6PuKNLTkRK',
        accessKeySecret: 'HCPxrUMLHyXWCXnbhAThs5bZOXyNX5',
        bucket: 'dobell-czlj',
      });
      resolve(client);
    });
  },

  /**
   * 文件上传
   * @param option
   */
  ossUpload(option) {
    let file = option.file;
    const self = this;
    return new Promise((resolve, reject) => {
      let fileName = 'imgs/' + this.randomString(12) + '.' + file.name;
      self.createOssClient().then(client => {
        resolve({
          fileName: file.name,
          fileUrl: fileName,
        });
        client
          .multipartUpload(fileName, file, {
            progress: function(p) {
              let e = {};
              e.percent = Math.floor(p * 100);
              option.onProgress(e);
            },
          })
          .then(
            val => {
              if (val.res.statusCode === 200) {
                option.onSuccess(val);
                return val;
              } else {
                option.onError('上传失败！');
              }
            },
            err => {
              option.onError('上传失败！');
              reject(err);
            }
          );
      });
    });
  },
};
