import config from './../config';
// 存储localStorage
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(config.storePrefix + name, content);
};
// 获取localStorage
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(config.storePrefix + name);
};

// 删除localStorage
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(config.storePrefix + name);
};

// 返回 时间格式 2018-02-09
export const DataTime = date => {
    if (!date) return '';
    date = new Date(date);
    var m = date.getMonth() + 1;
    m = m > 9 ? m : `0${m}`;
    var d = date.getDate();
    d = d > 9 ? d : `0${d}`;
    return date.getFullYear() + '-' + m + '-' + d;
};

export function preloadImages(imgUrlArr) {
    // 已加载图片数量
    let loadedImage = 0;
    // 存放图片的数组
    let newImages = [];
    // 返回一个promise 对象
    return new Promise((resolve, reject) => {
        for (let i = 0; i < imgUrlArr.length; i++) {
            newImages[i] = new Image();
            // 设置图片src 属性
            newImages[i].src = imgUrlArr[i];
            // 图片绑定onload事件，确保加载完成
            newImages[i].onload = () => {
                loadedImage++;
                // 当全部加载完成后 ,resolve
                if (loadedImage == imgUrlArr.length) {
                    resolve();
                }
            };
            newImages[i].onerror = () => {
                reject(new Error());
            };
        }
    });
}

// 日期格式化
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : padLeftZero(str)
            );
        }
    }
    return fmt;
}
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

// 图片转化base64
export function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
    // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
    // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
    // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

// 实现滚动条无法滚动
var mo = function(e) {
    e.preventDefault();
};

/** *禁止滑动***/
export function touchmovestop() {
    document.body.style.cssText = 'position:hidden';
    // document.body.style.position = 'fixed';
    // document.addEventListener("touchmove", mo, false);//禁止页面滑动
}

/** *取消滑动限制***/
export function touchmovemove() {
    document.body.style.cssText = 'position:hidden auto';
    // document.body.style.position = '';
    // document.removeEventListener("touchmove", mo, false);
}

// 解决遮罩层滚动穿透问题，分别在遮罩层弹出后和关闭前调用
const ModalHelper = (bodyCls => {
    let scrollTop;
    return {
        afterOpen: function() {
            scrollTop = document.scrollingElement.scrollTop;
            document.body.classList.add(bodyCls);
            document.body.style.top = -scrollTop + 'px';
        },
        beforeClose: function() {
            document.body.classList.remove(bodyCls);
            // scrollTop lost after set position:fixed, restore it back.
            document.scrollingElement.scrollTop = scrollTop;
        }
    };
})('dialog-open');
