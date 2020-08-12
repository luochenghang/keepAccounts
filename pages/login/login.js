const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
var util = require("../../utils/util.js");
var app = getApp();

Page({
  data: {
    loginBtnTxt: "登录",
    loginBtnBgBgColor: "#1CBCB4",
    btnLoading: false,
    disabled: false,
    inputUserName: '',
    inputPassword: '',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {

    var that = this
    // 页面显示
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          that.bindGetUserInfo();
        }
      }
    })
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  bindGetUserInfo: function (ev) {
console.log(ev)
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        app.globalData.code = res.code
        if (ev.detail.errMsg === 'getUserInfo:ok') {
          let {
            userInfo,
            ...loginData
          } = ev.detail
          app.globalData.userInfo = userInfo
          app.globalData.loginData = loginData
          app.login(true).then(res => {
            wx.switchTab({
              url: '/pages/detail/detail',
            })
          })
        }
      }
    })
  },
})