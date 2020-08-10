// pages/statistics/statistics.js
import {iconColor, seriesData, getOption} from '../../utils/statistics.js'
import * as echarts from '../../ec-canvas/echarts';
const app = getApp()
var chart = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    name: '饼图',
    title: [
      {
        name: '饼图',
        path: "/images/bingtu.png",
        selctedPath: "/images/bingtu_active.png"
      },{
        name: '折线图',
        path: "/images/zhexiantu.png",
        selctedPath: "/images/zhexiantu_active.png"
      }
    ]
  },
  //点击图标，切换饼图和折线图
  handleClick(e){
    console.log('image', e.currentTarget.dataset)
    //tab切换
    const currentIndex = e.currentTarget.dataset.index
    const name = e.currentTarget.dataset.name
    this.setData({
      currentIndex,
      name
    })
    //调用子组件的方法
    // this.selectComponent('#myPie').getOptionPie()
    
  },
  //微信小程序禁止下拉
  onPageScroll: function(e){
    if(e.scrollTop <0){
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //管理tabbar状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})