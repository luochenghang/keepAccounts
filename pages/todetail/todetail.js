const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    bill:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 接受参数并设置
    console.log(options)
    var id = options.id
    this.setData({
      id: id
    })
this._getBillDetail()

  },

_getBillDetail(){
  let that = this;
    
  let requestData = {
    url: ApiConst.getBills,
    data: {id:that.data.id}
  }
  ApiManager.send(requestData, 'GET').then(res => {
    if (res.data.code == 1000) {
      that.setData({
       bill: res.data.data,
      }) 
    }
  })
},

  // 编辑
  edit: function() {
    var bill = this.data.bill
    // 检测参数
    if (bill.money == "" || bill.money==0) {
      wx.showToast({
        title: '请输入金额',
        icon: 'none',
        duration: 10000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
      return
    }
    if (bill.remake.length > 20) {
      wx.showToast({
        title: '备注不得超过10个汉字',
        icon: 'none',
        duration: 10000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
      return
    }
   
    let that = this;
    let requestData = {
      url: ApiConst.editBills,
      data: {
        id:bill.id,
        money:bill.money,
        createDate:bill.createDate,
        remake:bill.remake
      }
    }
    ApiManager.send(requestData, 'POST').then(res => {

      if (res.data.code == 1000) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail);
    this.setData({
      'bill.createDate': e.detail.value
    })
  },
  remakeInput:function(e){
    this.setData({
      'bill.remake': e.detail.value
    })
  },
  moneyInput:function(e){
    this.setData({
      'bill.money': e.detail.value
    })
  },
  // 删除
  del: function() {
    var id = this.data.bill.id;
    // 询问是否删除
    var that = this
    wx.showModal({
      title: '删除提示',
      content: '是否确认删除',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          // 向后段发起删除请求
          let requestData = {
            url: ApiConst.delBills,
            data: {
              id:id,
            }
          }
          ApiManager.send(requestData, 'POST').then(res => {
            if (res.data.code == 1000) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } 
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

  },

})