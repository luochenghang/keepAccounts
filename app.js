//app.js
const ApiConst = require('./api/ApiConst.js')
let util = require('./utils/util.js')


App({

  globalData: {
    isAdmin: false, //判断是否已经登录后端统计了
    userInfo: null,
    vipInfo: null,
    // 登录所需要的数据
    loginData: null,
    code: '', // login code
    M_token: null, // 定位token
    token: '', // token
    phone: null,
    isLogin: false
  },

  onLaunch: function () {

    // 检测新版本
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    // 登录
    wx.login({
      success: res => {
        // console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              let {
                userInfo,
                errMsg,
                rawData,
                ...loginData
              } = res
              this.globalData.userInfo = userInfo
              this.globalData.loginData = loginData
              this.login().then(res => 
                wx.switchTab({
                  url: '/pages/detail/detail',
                })
              )
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },



  parseRes(data, callback) {
    if (data.code === 1000) {
      if (callback) callback()
    } else if (data.code === 2000) {
      util.loginTip(res.data.msg)
    } else if (data.code === 3000) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
    wx.hideLoading()
  },
  // 登录
  login(back = false) {
    return new Promise((resolve, reject) => {
      let params = this.globalData.loginData
      params.code = this.globalData.code
      params.nickName = this.globalData.userInfo.nickName
      params.portrait = this.globalData.userInfo.avatarUrl
      params.sex = this.globalData.userInfo.gender
      params.portrait = this.globalData.userInfo.avatarUrl
      params.sign = this.globalData.loginData.signature
      wx.request({
        url: ApiConst.login,
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: params,
        success: res => {
          let { data } = res.data
          this.parseRes(res.data, () => {
            this.globalData.token = data.token
            this.globalData.isLogin = true
            data.phone ? this.globalData.phone = data.phone : null
            if (back) {
              wx.navigateBack({
                delta: 1
              })
            }
            resolve()
          })
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },

})