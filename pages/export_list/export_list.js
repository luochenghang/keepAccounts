var app = getApp()
const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    FilesList: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

  },

  // .js文件
  copyValue: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    wx.setClipboardData({
      //准备复制的数据
      data: url,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._getUserFilesList()
  },

  _getUserFilesList: function () {
    let that = this;

    let requestData = {
      url: ApiConst.getUserFilesList,
      data: {}
    }
    ApiManager.send(requestData, 'GET').then(res => {
      if (res.data.code == 1000) {
        that.setData({
          FilesList: res.data.data,
        })
      }
    })
  },

  onShareAppMessage() {
    let _data = {
      title: '我的记账本',
      path: '/pages/mine/mine',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
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
        wx.showToast({
          title: '导出成功！',
          icon: 'success',
          duration: 10000
        })
        setTimeout(function () {
          wx.hideToast()
          that._getUserFilesList()
        }, 2000)
        
      }
    })


  },

})