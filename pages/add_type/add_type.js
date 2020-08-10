const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
var util = require("../../utils/util.js");


//获取应用实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    billsTypeId:0,
    remark: '',
    date: util.formatDate(new Date()),
    value: '',
    name: "",
    ico_name: '',
    icon_url: '',
    selectedIconId: 0,
    type: 1,
    iconList: [],
    current: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      type: options.type//options为页面路由过程中传递的参数
    })
    var title = "添加支出类别";
    if(that.data.type == 2){
      title = "添加收入类别";
    }
    wx.setNavigationBarTitle({
      title: title//页面标题为路由参数
    })
  },
  onShow: function () {
    this._getIconList();
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail);
    this.setData({
      date: e.detail.value
    })
  },

  // 请求获取标签
  _getIconList: function () {

    let that = this;
    let requestData = {
      url: ApiConst.getSystemBillsTypeList,
      data: {}
    }
    ApiManager.send(requestData, 'GET').then(res => {

      if (res.data.code == 1000) {
        that.setData({
          iconList: res.data.data,
          selectedIconId: res.data.data[0].id,
          icon_url:res.data.data[0].imgUrl,
        })
      }
    })
  },


  // 标签点击
  iconClick: function (e) {
    this.setData({
      selectedIconId: e.target.dataset.id,
      icon_url: e.target.dataset.url
    })
  },

  outClick: function () {
    // 请求获取标签
    this.setData({
      current: 1,
      icon_type: 1
    });
    this._getIconList();
  },
  inClick: function () {
    this.setData({
      current: 2,
      icon_type: 2
    });
    this._getIconList();
  },

  nameInput(e) {
    this.data.name = e.detail.value
  },
  //确定
  ok: function (e) {
    
    // 组织参数
  // 检测参数
  if (this.data.name == "") {
    wx.showToast({
      title: '请输入类型名称且不超过4个字',
      icon: 'none',
      duration: 10000
    })
    setTimeout(function () {
      wx.hideToast()
    }, 2000)
    return
  }
  
var params = {
  billsTypeId:this.data.selectedIconId,
  name:this.data.name,
  type:this.data.type
}

    let that = this;
    let requestData = {
      url: ApiConst.addUserBillsType,
      data: params
    }
    ApiManager.send(requestData, 'POST').then(res => {
      if (res.data.code == 1000) {
        wx.navigateBack({
          delta: 1
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 10000
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
        return
      }
    })
  },

})