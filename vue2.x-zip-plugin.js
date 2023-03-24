/**
 *  ===   文件打包生成zip文件 配置
 *   需要安装 2.0.5 版本  "filemanager-webpack-plugin": "^2.0.5",
 *   使用方式
 const zipPlugin = require('vue2.x-zip-plugin')
 zipPlugin().outputDir 生成包名
 zipPlugin().plugin() 执行方法

 */
const FileManagerPlugin = require('filemanager-webpack-plugin')
const packageData = require('./package.json')
const pluginInit = function (name) {
  // const packageName = `${ packageData.name }-v${ packageData.version }`
  function extract (date) {
    // 返回 ['2022', '09', '19', '18', '06', '11', '187']
    const d = new Date(new Date(date).getTime() + 8 * 3600 * 1000);
    return new Date(d).toISOString().split(/[^0-9]/).slice(0, -1);
  }

  let outputDirName = name || `dist/${ packageData.name }-v${ packageData.version }`
  const time = `${ extract(new Date()).slice(0, 4).join('.') }`

  return {
    plugin () {
      return new FileManagerPlugin({
        onEnd: {
          delete: ['./*.zip'],
          // delete: ['./*.zip', './dist/*.zip'],
          archive: [
            {
              source: `./${ outputDirName }`,
              destination: `./${ outputDirName }-${ time }.zip`
            }
          ]
        }
      })
    },
    outputDir: outputDirName
  }
}
module.exports = pluginInit
