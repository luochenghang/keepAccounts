var app = getApp()
const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg: "",
    nickname: "",
    UserBillsInfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var that = this
    wx.getUserInfo({
      success(res) {
        that.setData({
          userimg: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this._getUserBillsInfo();
  },

  _getUserBillsInfo:function(){
    let that = this;
    
    let requestData = {
      url: ApiConst.CountStatistics,
      data: {}
    }
    ApiManager.send(requestData, 'GET').then(res => {
      if (res.data.code == 1000) {
        that.setData({
         UserBillsInfo: res.data.data,
        }) 
      }
    })
  },

  onShareAppMessage() {
    let _data = {
      title: '我的记账本',
      path: '/pages/mine/mine',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },

  exportFiles: function () {
    var that = this
    let requestData = {
      url: ApiConst.exportData,
      data: {}
    }
    ApiManager.send(requestData, 'POST').then(res => {
      if (res.data.code == 1000) {
        
      }
    })
  },  

  setting(){
    wx.navigateTo({
      url: '/pages/bills_type/bills_type?type=1',
    })
  },
  aboutUs: function() {
    var that = this
    wx.showModal({
      title: '我的记账本',
      content: '本小程序用于记录用户的财务情况，财务自由从此开始!',
      showCancel: false
    })
  },
})