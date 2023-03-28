/**
 *  === vue2.x 脚手架 文件打包生成zip文件 配置
 *   需要安装 2.0.5 版本  "filemanager-webpack-plugin": "^2.0.5",
 *   使用方式
 const zipPlugin = require('vue2.x-dist-zip')
 zipPlugin() 执行方法

 configureWebpack: {
    plugins: process.env.NODE_ENV === 'production' ? [zipPlugin()] : []
  }
 */
const FileManagerPlugin = require('filemanager-webpack-plugin')
const packageData = require('./package.json')
const pluginInit = function (sourcePath) {
  // const packageName = `${ packageData.name }-v${ packageData.version }`
  function extract(date) {
    // 返回 ['2022', '09', '19', '18', '06', '11', '187']
    const d = new Date(new Date(date).getTime() + 8 * 3600 * 1000);
    return new Date(d).toISOString().split(/[^0-9]/).slice(0, -1);
  }

  let packageName = `${ packageData.name }-v${ packageData.version }`
  // let outputDirName = name || `dist/${ packageName }`
  let outputDirName = sourcePath || 'dist'
  // let destinationPath = `${ outputDirName }/${ packageName }`
  const time = `${ extract(new Date()).slice(0, 5).join('.') }`

  console.log('开始压缩==========')
  return new FileManagerPlugin({
    // events: {
    onEnd: {
      delete: ['./*.zip'],
      archive: [
        {
          source: `./${ outputDirName }`,
          destination: `./${ packageName }-${ time }.zip`
        }
      ]
    }
    // }
  })
}
module.exports = pluginInit
