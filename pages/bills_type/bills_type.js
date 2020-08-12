// pages/bills_type/bills_type.js
const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    iconList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
  },

  // 请求获取标签
  _getIconList: function () {

    let that = this;
    let requestData = {
      url: ApiConst.getUserBillsTypeList,
      data: { type: that.data.type }
    }
    ApiManager.send(requestData, 'GET').then(res => {

      if (res.data.code == 1000) {
        that.setData({
          iconList: res.data.data,
        })
      }
    })
  },

  outClick: function () {
    // 请求获取标签
    this.setData({
      type: 1
    });
    this._getIconList();
  },
  inClick: function () {
    this.setData({
      type: 2
    });
    this._getIconList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._getIconList();
  },
  addType: function () {
    wx.navigateTo({
      url: '/pages/add_type/add_type?type=' + this.data.type,
    })
  },


  delType: function (e) {
    var id = e.currentTarget.dataset.id;
    let requestData = {
      url: ApiConst.delBillsType,
      data: { id: id }
    }
    let that = this
    wx.showModal({
      title: '删除类型',
      content: '您将删除该类型以及该类型下所有的账单，您确定删除该类型吗?',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {

        if (res.confirm) {
          ApiManager.send(requestData, 'POST').then(res => {

            if (res.data.code == 1000) {

              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 10000
              })
              setTimeout(function () {
                wx.hideToast()
              }, 2000)
              that._getIconList();
            }
          })
        }
      }
    });

  }

})