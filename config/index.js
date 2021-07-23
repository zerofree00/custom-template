/*
 * @Description:
 * @Version: 1.0
 * @LastEditTime: 2021-06-02 10:52:38
 */
/**
 * 网站配置信息
 */

module.exports = {
    jade: {
        // jade -> html 需要监听转换的jade文件路径
        jadeTohtml: './src/view/main/*.pug',
        // html 输出的路径
        jadeTodist: './dist',
        // jade -> html 需要监听转换的jade文件路径
        jadeTohtmlView: './src/view/view/*.pug',
        // html 输出的路径
        jadeTodistView: './dist',
    },
    styl: {
        stylTocssHtml: './src/assets/css/html/*.styl',
        // 将 public/ 公共的 styl 文件直接编译在 dist/ 中生成对应的
        stylTocssPublic: './src/assets/css/public/*.styl',
        cssToDist: '',
        // 将 page/ 中 styl 编译合并
        stylTocssPage: './src/assets/css/layout.styl',
        // styl 转换完成后，需要将多个文件合并成一个的文件名
        stylToFileName: 'main.css',
        // css 输出的路径
        stylTodist: './dist/css/',
        // 拷贝 public中的第三方css到dist文件夹
        copyPublic: './src/assets/css/public/*.css',
        DistPublic: './dist/css/public',
        DistCssHtml: './dist/css/html',
    },
    watch: {
        // gulp 需要监听的文件路径，当我们在src修改源码时，gulp会动态编译输出到dist
        watchFile: 'src/**/*',
    },
    nodeService: {
        // 访问ip
        // host: "http://127.0.0.1:",
        host: 'http://localhost:',
        // 访问端口
        port: 1314,
        // 提示信息
        log: '项目运行在:',
        // 是否开始自动打开浏览器功能，取值：true，false
        isOpenBrowser: true,
    },
    watch2: {
        // gulp 需要监听的文件路径，当我们在src修改源码时，gulp会动态编译输出到dist
        watchFile: 'srchtml/**/*',
    },
    htmltpl: {
        htmlPath: './src/htmltpl/{pages,common,components}/**/*.html',
        htmlTohtml: './src/htmltpl/pages/**/*.html',
        // html 输出的路径
        htmlTodist: './dist',
    },
}
