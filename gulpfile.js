const gulp = require('gulp')
// 编译pug文件为hrml
const pug = require('gulp-pug')
// 编译stylus文件为css
const stylus = require('gulp-stylus')
// 自动为css3属性加前缀
const autoprefixer = require('gulp-autoprefixer')
// 合并js，css文件
const concat = require('gulp-concat')
// 压缩css
const cssmin = require('gulp-clean-css')
// gulp 文件监听
const watchPath = require('gulp-watch-path')
// zip压缩
const zip = require('gulp-zip')
// 压缩js文件
const uglify = require('gulp-uglify')
// 处理gulp错误，防止程序报错终止
const plumber = require('gulp-plumber')
// 这个插件其实很强大哈，集合了许多 Gulp 中常用的小工具，例如 log() 、 colors 等等，这里只用到了 beep() & log ，
// 就是让电脑 哔 ~ 的响一声然后抛出异常，哈哈
const gutil = require('gulp-util')

// 引入gulp的配置文件
const config = require('./config/index.js')
// 引入全局公共方法
const { RemoveFile, RemoveFile2 } = require('./utils')

//  不用jade的html
var htmltpl = require('gulp-html-tpl') // 引用html模板
var artTemplate = require('art-template') // 模板渲染
var rename = require('gulp-rename') // 重命名

// html模板处理
gulp.task('htmls', function () {
    return gulp
        .src(config.htmltpl.htmlTohtml)
        .pipe(
            plumber({
                errHandler: (e) => {
                    gutil.beep()
                    gutil.log(e)
                },
            })
        )
        .pipe(
            htmltpl({
                tag: 'component',
                paths: ['./src/htmltpl/common', './src/htmltpl/components'],
                engine: function (template, data) {
                    return template && artTemplate.compile(template)(data)
                },
                // 传入页面的初始化数据
                data: {
                    header: false,
                    g2: false,
                },
            })
        )
        .pipe(
            rename({
                dirname: '', // 清空路径
            })
        )
        .pipe(gulp.dest(config.htmltpl.htmlTodist))
})

/**
 * 编译jade为html
 */
gulp.task('jadehtml', function buildHTML() {
    return gulp
        .src(config.jade.jadeTohtml)
        .pipe(
            plumber({
                errHandler: (e) => {
                    gutil.beep()
                    gutil.log(e)
                },
            })
        )
        .pipe(
            pug({
                pretty: true,
            })
        )
        .pipe(gulp.dest(config.jade.jadeTodist))
})

/**
 * 编译jade为html在view文件夹下
 */
gulp.task('jadeview', function () {
    return gulp
        .src(config.jade.jadeTohtmlView)
        .pipe(
            plumber({
                errHandler: (e) => {
                    gutil.beep()
                    gutil.log(e)
                },
            })
        )
        .pipe(
            pug({
                pretty: true,
            })
        )
        .pipe(gulp.dest(config.jade.jadeTodistView))
})

/**
 *  编译公共页 css public
 */
gulp.task('publicstyl', function () {
    return (
        gulp
            .src(config.styl.stylTocssPublic)
            .pipe(
                plumber({
                    errHandler: (e) => {
                        gutil.beep()
                        gutil.log(e)
                    },
                })
            )
            .pipe(stylus())
            .pipe(
                autoprefixer({
                    browsers: [
                        'last 2 versions',
                        'last 2 Explorer versions',
                        'Android >= 4.0',
                    ],
                    cascade: true,
                })
            )
            /**
             * 压缩兼容处理css文件，取消注释使用
             */
            // .pipe(cssmin({
            //     advanced: false,
            //     compatibility: 'ie7',
            //     keepBreaks: false,
            //     keepSpecialComments: '*'
            // }))
            // .pipe(gulp.dest(config.styl.DistPublic))
            .pipe(gulp.dest(`${config.styl.stylTodist}`))
    )
})

/**
 *  编译单页 css html
 */
gulp.task('htmlcstyl', function () {
    return (
        gulp
            .src(config.styl.stylTocssHtml)
            .pipe(
                plumber({
                    errHandler: (e) => {
                        gutil.beep()
                        gutil.log(e)
                    },
                })
            )
            .pipe(stylus())
            .pipe(
                autoprefixer({
                    browsers: [
                        'last 2 versions',
                        'last 2 Explorer versions',
                        'Android >= 4.0',
                    ],
                    cascade: true,
                })
            )
            /**
             * 压缩兼容处理css文件，取消注释使用
             */
            // .pipe(cssmin({
            //     advanced: false,
            //     compatibility: 'ie7',
            //     keepBreaks: false,
            //     keepSpecialComments: '*'
            // }))
            .pipe(gulp.dest(config.styl.DistCssHtml))
    )
})

/**
 * 编译主要页面的 css，合并为main.css
 */
gulp.task('pagestyl', function () {
    return (
        gulp
            .src(config.styl.stylTocssPage)
            .pipe(
                plumber({
                    errHandler: (e) => {
                        gutil.beep()
                        gutil.log(e)
                    },
                })
            )
            .pipe(stylus())
            .pipe(
                autoprefixer({
                    browsers: [
                        'last 2 versions',
                        'last 2 Explorer versions',
                        'Android >= 4.0',
                    ],
                    cascade: true,
                })
            )
            .pipe(concat(config.styl.stylToFileName))
            /**
             * 同上
             */
            // .pipe(cssmin({
            //     advanced: false,
            //     compatibility: 'ie7',
            //     keepBreaks: false,
            //     keepSpecialComments: '*'
            // }))
            // .pipe(gulp.dest(`${config.styl.stylTodist}page`))
            .pipe(gulp.dest(`${config.styl.stylTodist}`))
    )
})

/**
 * 拷贝 public中的第三方css到dist文件夹
 */
gulp.task('copycss', function () {
    return gulp
        .src('src/assets/css/public/*.css')
        .pipe(
            plumber({
                errHandler: (e) => {
                    gutil.beep()
                    gutil.log(e)
                },
            })
        )
        .pipe(
            cssmin({
                advanced: false,
                compatibility: 'ie7',
                keepBreaks: false,
                keepSpecialComments: '*',
            })
        )
        .pipe(gulp.dest(config.styl.DistPublic))
})

/**
 * 拷贝img 到dist文件夹
 */
gulp.task('copyimg', function () {
    return gulp
        .src('src/assets/img/*')
        .pipe(
            plumber({
                errHandler: (e) => {
                    gutil.beep()
                    gutil.log(e)
                },
            })
        )
        .pipe(gulp.dest('dist/img'))
})

/**
 * 拷贝字体文件
 */
gulp.task('copyfont', function () {
    return gulp
        .src('src/assets/font/*')
        .pipe(
            plumber({
                errHandler: (e) => {
                    gutil.beep()
                    gutil.log(e)
                },
            })
        )
        .pipe(gulp.dest('dist/font'))
})

/**
 * 拷贝js文件
 */
gulp.task('copyjs', function () {
    return (
        gulp
            .src('src/assets/js/*')
            .pipe(
                plumber({
                    errHandler: (e) => {
                        gutil.beep()
                        gutil.log(e)
                    },
                })
            )
            /**
             * 压缩js代码，取消注释启用
             */
            // .pipe(uglify({
            //     compress: false
            //   }))
            .pipe(gulp.dest('dist/js'))
    )
})

/**
 * 自动zip打包 dist 文件夹，用于提交给后端
 */
gulp.task('Online', function () {
    return gulp
        .src(['./dist/**'])
        .pipe(
            plumber({
                errHandler: (e) => {
                    gutil.beep()
                    gutil.log(e)
                },
            })
        )
        .pipe(zip('Online.zip'))
        .pipe(gulp.dest('./'))
})

/**
 * 监听用户在 src/ 的所有文件操作
 */
/*
    paths {srcPath: 'src/file.js',
          srcDir: 'src/',
          distPath: 'dist/file.node',
          distDir: 'dist/',
          srcFilename: 'file.js',
          distFilename: 'file.node' }
    */
gulp.task('file', function () {
    gulp.watch(config.watch.watchFile, function (event) {
        let paths = watchPath(event, 'src/', 'Template/src/')
        console.log(' paths===========', paths)
        console.log(' event===========', event)
        switch (event.type) {
            case 'deleted':
                console.log('删除操作...')
                console.log(paths.srcDir.indexOf('assets\\img'))
                // 如果是删除图片，添加后缀 .img,方便后期判断
                if (paths.srcDir.indexOf('assets\\img') > -1) {
                    RemoveFile2(paths.srcFilename + '.img')
                } else {
                    RemoveFile2(paths.srcFilename)
                }
                break
            default:
                console.log('其他操作...', event.type)
                gulp.run(
                    'publicstyl',
                    'copyfont',
                    'pagestyl',
                    'jadeview',
                    'jadehtml',
                    'copyjs',
                    'copyimg',
                    'copycss',
                    'htmls'
                    // 'Online'
                )
                break
        }
    })
})

/**
 * 监听用户在 srchtml/ 的所有文件操作
 */
gulp.task('file2', function () {
    gulp.watch('src/htmltpl', function (event) {
        let paths = watchPath(event, 'src/', 'Template/src/')
        console.log('watch2=================paths====', paths)
        switch (event.type) {
            case 'deleted':
                console.log('删除操作...')
                RemoveFile2(paths.srcFilename)
                break
            default:
                console.log('其他操作...', event.type)
                gulp.run('htmls')
                break
        }
    })

    // w(html_path, 'html')
    // function w(path, task) {
    //     watch(path, function () {
    //         runSequence(task, 'browser_reload') // 打包完成后，再刷新浏览器。监听任务不要带cb参数，否则会报错：回调次数太多
    //     })
    // }
})

/**
 * 默认先运行一次 编译过程
 */
gulp.run(
    'publicstyl',
    'copyfont',
    'pagestyl',
    'jadeview',
    'jadehtml',
    'copyjs',
    'copyimg',
    'copycss',
    'htmls'
    // 'Online'
)

/**
 * 执行file任务，当文件被操作后进行相关的编译过程
 */
gulp.task('default', ['file'])
