// pages/statistics/childCpns/list/list.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentIndex: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    addPage: app.globalData.addPage
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(){
      wx.switchTab({
        url: '/pages/keep_accounts/keep_accounts',
      })
    }
  },
  pageLifetimes: {
    show: function(){
      this.setData({
        addPage: app.globalData.addPage
      })
      console.log('list',app.globalData.addPage)
    }
  }
})
