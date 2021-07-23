/*
 * @Description:
 * @Version: 1.0
 * @LastEditTime: 2021-05-26 18:31:16
 */

$(function () {
    var docEl = document.documentElement,
        recalc = function () {
            var clientWidth = document.documentElement.clientWidth
            if (!clientWidth) return
            if (clientWidth >= 1440) {
                docEl.setAttribute('clientWidth', 1920)
            } else {
                docEl.setAttribute('clientWidth', 1440)
            }
        }
    recalc()
    $(window).resize(function () {
        recalc()
    })
})
