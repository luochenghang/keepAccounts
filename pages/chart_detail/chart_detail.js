const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
Page({

  /**
   * 组件的初始数据
   */
  data: {
    index: 0,
    dateType: 1, //1表示周 2表示月 3表示年
    chartList: [],
    days: "", //下面选中的key值  本周。。。。
    billsList:[],
    params:{
    },
  },

  onShow: function () {
  },
  onLoad: function (option) {
 
    this.setData({
      'params.type':option.type,
      'params.dateType':option.dateType,
      'params.days':option.days,
      'params.remake':option.remake,
      'params.userBillsTypeId':option.userBillsTypeId,
      name:option.name,
    })

    wx.setNavigationBarTitle({
      title: option.name//页面标题为路由参数
    })

    this._getBillsDetail()
  },
  toDetail: function(e) {
    // 跳转到详情页面
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/todetail/todetail?id='+ id
    })
  },
  _getBillsDetail:function(){
    var that = this
    let requestData = {
      url: ApiConst.getBillsByRemakeAndTypeId,
      data: that.data.params
    }
    ApiManager.send(requestData, 'GET').then(res => {
      if (res.data.code == 1000) {
        that.setData({
          billsList: res.data.data,
        })
      }
    })
  },

})



