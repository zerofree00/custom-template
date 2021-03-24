// vue.config.js
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const vConsolePlugin = require('vconsole-webpack-plugin');
// 文件打包
const FileManagerPlugin = require('filemanager-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// 配置打包出来的名字
const outputDirName = 'dist';

module.exports = {
    publicPath: './', // 基本路径
    outputDir: outputDirName, // 输出文件目录
    devServer: {
        // public: 'http://192.168.4.129:8080',
        // hot: true,
        disableHostCheck: true,
        port: 8081,
        proxy: {
            '/apis': {
                target: 'http://192.168.5.127:8084/hnzx',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/apis': '',
                },
            },
        },
    },
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias.set('@', resolve('src'));
    },

    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('autoprefixer')({
                        // 配置使用 autoprefixer
                        overrideBrowserslist: ['last 15 versions'],
                    }),
                    require('postcss-pxtorem')({
                        // 换算的基数 默认为37.5，一般不建议修改它，使用vant ui框架中也是默认37.5
                        rootValue: 37.5,
                        // 忽略转换正则匹配项，插件会转化所有的样式的px。比如引入了三方UI，也会被转化.
                        //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
                        selectorBlackList: [], //忽略的选择器   .ig-  表示 .ig- 开头的都不会转换
                        propList: ['*'], //属性的选择器，*表示通用
                    }),
                ],
            },
        },
    },
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    configureWebpack: (config) => {
        //生产环境去掉vconsole调试器
        let envFlag = process.env.NODE_ENV != 'production';
        let pluginsDev = [
            new vConsolePlugin({
                filter: [],
                enable: envFlag,
            }),
        ];

        if (process.env.NODE_ENV == 'production') {
            // 打包压缩
            config.plugins.push(
                new FileManagerPlugin({
                    onStart: {
                        delete: ['./*.zip', './dist'],
                    },
                    onEnd: {
                        archive: [
                            {
                                source: `./${outputDirName}`,
                                destination: `./${outputDirName}.zip`,
                            },
                        ],
                    },
                })
            );

            /* 移除 console */
            config.plugins.push(
                new TerserPlugin({
                    terserOptions: {
                        warnings: false,
                        output: {
                            comments: false,
                        },
                        compress: {
                            // 删除无用的代码
                            unused: true,
                            // 删掉 debugger
                            drop_debugger: true, // eslint-disable-line
                            // 移除 console
                            drop_console: true, // eslint-disable-line
                            // 移除无用的代码
                            dead_code: true, // eslint-disable-line
                            pure_funcs: ['console.log'],
                        },
                    },
                })
            );
        }

        config.plugins = [...config.plugins, ...pluginsDev];
    },
};
