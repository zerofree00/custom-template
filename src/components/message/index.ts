import { Dialog } from 'vant'

/**
 *
 * @param title 标题提示语  默认提交成功
 * @param message 内容提示语  默认已提交
 * @returns 返回一个Promise对象 点击我知道了后 触发resolve 事件
 */
export const success = function (title: string = '提交成功', message: string = '已提交'): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Dialog.close()
      resolve('success')
    }, 1500)
    Dialog.alert({
      title: '',
      message: `<div class="dialog-success-box"><p>${title}</p><p>${message}</p></div>`,
      confirmButtonText: '我知道了',
      allowHtml: true,
      className: 'dialog-success'
    }).then(() => {
      // on close
      resolve('success')
    })
  })
}

export const messageDetail = function (title:string = '详情', message:string, width:number = 320):void {
  Dialog.alert({
    title: title,
    message: message,
    confirmButtonText: '关闭',
    allowHtml: true,
    className: '',
    width
  }).then(() => {
    // on close
  })
}
