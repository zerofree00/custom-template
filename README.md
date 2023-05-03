# mytemplate
模板整理保存

# 分支 utils
保存一些前端工具类


# npm 库

### vue2.x项目打包的时候，直接压缩dist生成zip
- https://www.npmjs.com/package/vue2-dist-zip
下载
> npm install vue2-dist-zip filemanager-webpack-plugin@2.0.5 -D 
> 
> 在vue.config.js中

> const zipPlugin = require('vue2-dist-zip')

> configureWebpack: {plugins: process.env.NODE_ENV === 'production' ? [zipPlugin('cppcc-data-exchange-shanxi')] : []}

![img.png](img.png)

