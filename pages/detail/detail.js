//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    mx_list: "",
    in_money: 0.00,
    out_money: 0.00,
  },

  onLoad: function() {
    var that = this
    var DATE = util.formatDate(new Date());
    var year = util.formatYear(new Date());
    var month = util.formatMonth(new Date());
    that.setData({
      date: DATE,
      year: year,
      month: month
    })
    wx.getUserInfo({
      success(res) {
        var nickname = app.globalData.userInfo.nickName
        wx.request({
          url: 'http://127.0.0.1:8000/detail?nickname=' + nickname + "&year=" + year + "&month=" + month,
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            console.log(res)
            that.setData({
              mx_list: res.data.bills,
              out_money: res.data.out_money,
              in_money: res.data.in_money
            });
          }
        })
      }
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail);

    this.setData({
      date: e.detail.value,
      year: e.detail.value.split('-')[0],
      month: e.detail.value.split('-')[1],
      // day: e.detail.value.split('-')[2],
    })
    var that = this
    wx.getUserInfo({
      success(res) {
        var nickname = app.globalData.userInfo.nickName
        var year = e.detail.value.split('-')[0]
        var month = e.detail.value.split('-')[1]
        console.log()
        wx.request({
          url: 'http://127.0.0.1:8000/detail?nickname=' + nickname + "&year=" + year + "&month=" + month,
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            that.setData({
              mx_list: res.data.bills,
              out_money: res.data.out_money,
              in_money: res.data.in_money
            });
          }
        })
      }
    })
  },

  toDetail: function(e) {
    // 跳转到详情页面
    var icon_type = e.currentTarget.dataset.icon_type
    var money = e.currentTarget.dataset.money
    var icon_name = e.currentTarget.dataset.icon_name
    var icon_url = e.currentTarget.dataset.icon_url
    var remark = e.currentTarget.dataset.remark
    var date = e.currentTarget.dataset.date
    var nid = e.currentTarget.dataset.nid

    wx.navigateTo({
      url: '/pages/todetail/todetail?icon_type=' + icon_type +"&icon_name=" + icon_name + "&icon_url=" + icon_url + "&icon_money=" + money + "&remark=" + remark + "&date=" + date + "&nid=" + nid,
    })
  },
  
  onShow(){
    this.onLoad()
  }
})
