//index.js
//获取应用实例
const app = getApp()
const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
var util = require("../../utils/util.js");
Page({
  data: {
    billList: [],
    in_money: 0.00,
    out_money: 0.00,
    createDate:null,
    UserBillsInfo:null,
  },

  onLoad: function() {
    this.setData({
      billList: [],
    in_money: 0.00,
    out_money: 0.00,
    createDate:null,
    UserBillsInfo:null,
    })
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
  _getBillList:function(){
    let that = this;
    
    let requestData = {
      url: ApiConst.getBillsList,
      data: {}
    }
    if(that.data.createDate != null)
      requestData = {
      url: ApiConst.getBillsList,
      data: { createDate: that.data.createDate }
    }
    ApiManager.send(requestData, 'GET').then(res => {
      if (res.data.code == 1000) {
        that.setData({
         billList: res.data.data,
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
      createDate:e.detail.value+"-01", //构造参数
    })

    this._getBillList();

  },

  toDetail: function(e) {
    // 跳转到详情页面
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/todetail/todetail?id='+ id
    })
  },
    
  onShareAppMessage() {
    let _data = {
      title: '海豚记账簿',
      path: '/pages/login/login',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onShow(){
    var that = this
    var DATE = util.formatDate(new Date());
    var year = util.formatYear(new Date());
    var month = util.formatMonth(new Date());
    that.setData({
      date: DATE,
      year: year,
      month: month
    })
   that.onLoad();
    that._getBillList()
    that._getUserBillsInfo()
  }
})
