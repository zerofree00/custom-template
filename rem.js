/*** html节点字体大小随屏幕大小改变 ***/
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 640) {
                let designSize = 1920; // 设计图尺寸
                let wW = docEl.clientWidth; // 窗口宽度
                let rem = wW * 100 / designSize;
                docEl.style.fontSize = rem + 'px';
            } else {
                docEl.style.fontSize = 40 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


// 4.如果是在手机上, 平板电脑上, 更要使用REM, 由于手机上一般不会调整浏览器大小, 所以可以在页面载入时, 设置一次即可

// $(function () {

//     var whdef = 50 / 750;// 表示750的设计图,使用50PX的默认值
//     var wH = window.innerHeight;// 手机窗口的高度
//     var wW = window.innerWidth;// 手机窗口的宽度
//     var rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
//     $('html').css('font-size', rem + "px");

// })


// 3.当浏览器窗口变化时, 内容的大小以及相对位置也会相应变化, 这个依靠JS修改HTML的FONT - SIZE值实现.如下:

// $(window).resize(function ()// 绑定到窗口的这个事件中
// {
//     var whdef = 100 / 1920;// 表示1920的设计图,使用100PX的默认值
//     var wH = window.innerHeight;// 当前窗口的高度
//     var wW = window.innerWidth;// 当前窗口的宽度
//     var rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
//     $('html').css('font-size', rem + "px");
// });