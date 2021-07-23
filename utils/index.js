/**
 * 全局公共函数
 */

// 自动打开浏览器
const open = require('open')
// 配置信息
const config = require('./../config')
// 终端输出颜色
const clc = require('cli-color')
// 文件操作
const fs = require('fs')
// 路径操作
const path = require('path')
// 获取文件基准地址
const Base = path.resolve(__dirname, '../dist')

/**
 * 返回完整的网址
 */
const URL = (type) => {
    if (type == 2)
        return `${config.nodeService.host}${config.nodeService.port2}`
    return `${config.nodeService.host}${config.nodeService.port}`
}

/**
 * open 模块： 自动打开浏览器
 * 模块地址：https://github.com/pwnall/node-open
 */
const OpenBrowser = (type) => {
    Notice(`${config.nodeService.log}${URL(type)}`)
    config.nodeService.isOpenBrowser ? open(URL(type)) : ''
}

/**
 * cli-color 模块：设置终端运行信息的颜色
 * @param {*string} log 需要log的信息
 * 模块地址： https://github.com/medikoo/cli-color
 */
const Notice = (log) => {
    // 终端输入运行的颜色
    let notice = clc.greenBright.bold
    console.log(notice(log))
}

/**
 * 当前端从src源码中删除某文件(jade，js，img,css)的时候，那么删除对应dist/中编译后文件
 * 这里我的思路有点乱，代码等待改进
 * @param {*string} filename
 */
const RemoveFile = (filename) => {
    if (SearchKey(filename, 'jade')) {
        deleteFile(ReturnFullUrl(ReturnFileName(filename, 'jade'), 'html'))
    } else if (SearchKey(filename, 'js')) {
        deleteFile(ReturnFullUrl(ReturnFileName(filename, 'js'), 'js'))
    } else if (SearchKey(filename, 'styl') || SearchKey(filename, 'mp3')) {
        Notice('忽略该文件...')
    } else if (SearchKey(filename, 'css')) {
        deleteFile(ReturnFullUrl(ReturnFileName(filename, '.css'), 'css'))
    } else if (SearchKey(filename, 'woff2')) {
        deleteFile(ReturnFullUrl(ReturnFileName(filename, '.woff2'), 'woff2'))
    } else if (SearchKey(filename, 'ttf')) {
        deleteFile(ReturnFullUrl(ReturnFileName(filename, '.ttf'), 'ttf'))
    } else {
        deleteFile(`${Base}/img/${filename}`)
    }
}

/**
 * 返回对应文件类型的 文件地址
 * @param {*string} name 需要删除的文件名称
 * @param {*string} type 需要删除的文件类型
 */
const ReturnFullUrl = (name, type) => {
    switch (type) {
        case 'html':
            return `${Base}/${name}${type}`
        case 'js':
            return `${Base}/js/${name}${type}`
        case 'css':
            return `${Base}/css/public/${name}.${type}`
        case 'woff2':
            return `${Base}/font/${name}.${type}`
        case 'ttf':
            return `${Base}/font/${name}.${type}`
        default:
            break
    }
}

/**
 * 返回的文件名称，例如 index.jade，返回 index
 * @param {*string} file 文件完整名称
 * @param {*string} plug 需要检测的文件后缀
 */
const ReturnFileName = (file, plug) => {
    return file.replace(plug, '')
}

/**
 * 删除文件
 * @param {*string} path 文件路径
 */
const deleteFile = (paths) => {
    return fs.unlink(paths, (err) => {
        return err ? console.error(err) : Notice(`${path} 对应文件已删除...`)
    })
}

/**
 * 检索字符串中是否有匹配的字符
 * @param {*string} key 需要检索的字符串
 */
const SearchKey = (par, key) => {
    return par.indexOf(key) != -1 ? true : false
}

/**
 * 当前端从srchtml 源码中删除某文件(html，js，img,css)的时候，那么删除对应dist2/中编译后文件
 * @param {*string} filename
 */
const RemoveFile2 = (filename) => {
    var index = filename.lastIndexOf('.')
    var suffix = filename.substring(index + 1)
    var newFileName = filename.substring(0, index)
    console.log(
        'RemoveFile2=================suffix=========================================================',
        suffix,
        newFileName
    )

    if (suffix == 'pug') {
        deleteFile(`${Base}/${newFileName}.html`)
    } else if (suffix == 'img') {
        deleteFile(`${Base}/img/${newFileName}`)
    } else if (suffix == 'html') {
        deleteFile(`${Base}/${filename}`)
    } else if (suffix == 'js') {
        deleteFile(`${Base}/js/${filename}`)
    } else if (suffix == 'css') {
        deleteFile(`${Base}/css/${filename}`)
    } else if (['woff2', 'ttf'].includes(suffix)) {
        deleteFile(`${Base}/font/${filename}`)
    } else if (['styl', 'mp3'].includes(suffix)) {
        Notice('忽略该文件...suffix=============', suffix)
    }
}

module.exports = { OpenBrowser, RemoveFile, RemoveFile2 }
