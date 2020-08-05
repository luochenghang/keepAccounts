var app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onAuth() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(res){
              console.log(res.userInfo)
              wx.request({
                url: 'http://127.0.0.1:8000/login',
                method: "POST",
                data: {
                  "nick_name": res.userInfo.nickName,
                  "avatar": res.userInfo.avatarUrl
                },
                headers: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                  console.log(res.data.errmsg)
                  if(res.data.errmsg == '授权成功'){
                    wx.reLaunch({
                      url: '../detail/detail',
                    })
                  }else{
                    wx.showToast({
                      title: '出现错误，请稍后再试',
                      icon: 'none',
                      duration: 10000
                    })
                    setTimeout(function () {
                      wx.hideToast()
                    }, 1000)
                  }
                  
                }
              })
             
            }
          })
          
          
        }
      }
    })
  }
})