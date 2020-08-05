// pages/todetail/todetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon_url: "",
    icon_type: "",
    money: "",
    icon_name: "",
    remark: "",
    date: "",
    nid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 接受参数并设置
    console.log(options)
    var p = options
    this.setData({
      date: p.date,
      money: p.icon_money,
      icon_name: p.icon_name,
      icon_type: p.icon_type,
      icon_url: p.icon_url,
      remark: p.remark,
      nid: p.nid,
    })
  },

  // 编辑
  edit: function() {
    console.log('获取到名字', this.data.icon_name)
    wx.navigateTo({
      url: '/pages/keep_accounts/keep_accounts',
    })
  },

  // 删除
  del: function() {
    console.log('获取到id', this.data.nid)
    // 询问是否删除
    var that = this
    wx.showModal({
      title: '',
      content: '是否确认删除',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          // 向后段发起删除请求
          wx.request({
            url: 'http://127.0.0.1:8000/del',
            method: "POST",
            data: {
              "nid": that.data.nid,
            },
            headers: {
              'Content-Type': 'application/json'
            },
            success(res) {
              console.log(res)
              // 返回上一页
              wx.navigateBack({
                delta: 1,
              })
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})