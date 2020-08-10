// pages/tubiao/tubiao.js
Page({
  /**
   * 组件的属性列表
   */
  

  /**
   * 组件的初始数据
   */
  data: {
    index:0,
    dateType:1, //1表示周 2表示月 3表示年
    type: ['支出', '收入'],
    menuList: [{
      name: "快车"
    }, {
      name: "顺风车"
    }, {
      name: "外卖"
    }, {
      name: "单车"
    }, {
      name: "礼橙专车"
    }, {
      name: "出租车"
    }, {
      name: "公交"
    }, {
      name: "代驾"
    }, {
      name: "豪华车"
    }, {
      name: "自驾租车"
    }, {
      name: "拼车"
    }, {
      name: "二手车"
    }],
    tabScroll: 0,
    currentTab: 0,
  },
  
  bindPickerChange: function (e) {
    console.log(e)
  },
  dateTypeClick: function (e) {

    this.setData({
      dateType: e.currentTarget.dataset.item,
    });
    //this._getIconList();
  },

  onLoad: function() {
    wx.getSystemInfo({ // 获取当前设备的宽高，文档有
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  onReady: function() {
   
  },
  //点击tab menu
  clickMenu: function(e) {
    var current = e.currentTarget.dataset.current; //获取当前tab的index
    // 导航tab共5个，获取一个的宽度
    var tabWidth = this.data.windowWidth / 5;
    this.setData({
      tabScroll: (current - 2) * tabWidth//使点击的tab始终在居中位置
    })
    if (this.data.currentTab == current) {
      return false
    } else {
      this.setData({
        currentTab: current
      })
    }
  },
  //活动menu 内容
  changeContent: function(e) {
    var current = e.detail.current // 获取当前内容所在index,文档有
    var tabWidth = this.data.windowWidth / 5
    this.setData({
      currentTab: current,
      tabScroll: (current - 2) * tabWidth
    })
  }
})
