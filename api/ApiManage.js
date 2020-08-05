let app = getApp()
let util = require('../utils/util.js')



const header = {
  POST: 'application/x-www-form-urlencoded',
  DELETE: 'application/json',
  GET: 'application/json',
  PUT: 'application/x-www-form-urlencoded'
}
function send(requestInfo, methodType) {
  if (!requestInfo) {
    return
  }
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: requestInfo.url,
      data: requestInfo.data,
      header: {
        'content-type': header[methodType], // 默认值
        'token': app.globalData.token
      },
      method: methodType,
      success(res) {
        if (res.data.code == 1000) {
          resolve(res)
        } else if (res.data.code === 3000) {
          wx.navigateTo({
            url: '/pages/authorize/index',
          })
          reject()
        }else {
          util.loginTip(res.data.msg)
        }
      },
      fail(res) {
        reject(res)
        //util.loginTip('服务器开小差了')
      },
      complete(res) {
        wx.hideLoading()
      }
    })
  })
}
module.exports = {
  send
};