// pages/tubiao/tubiao.js
const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
var util = require("../../utils/util.js");
import * as echarts from '../../ec-canvas/echarts';
Page({

  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      lazyLoad: true // 延迟加载
    },
    index: 0,
    dateType: 1, //1表示周 2表示月 3表示年
    type: ['支出', '收入'],
    menuList: [],
    tabScroll: 0,
    currentTab: 0,
    chartList: [],
    days: "", //下面选中的key值  本周。。。。
    billsList: [],
    currentIndex: 0,

  },

  bindPickerChange: function (e) {
    console.log(e)
    this.setData({
      index: e.detail.value,
    })
    this.init_line()
  },
  dateTypeClick: function (e) {

    this.setData({
      dateType: e.currentTarget.dataset.item,
    });
    this._getMenuList();
  },
  onShow: function () {
    this._getMenuList()

  },


  toDetail: function (e) {
    // 跳转到详情页面
    var userBillsTypeId = e.currentTarget.dataset.typeid
    var remake = e.currentTarget.dataset.remake
    var name = e.currentTarget.dataset.name
    var params = "&type=" + (parseInt(this.data.index) + 1) + "&dateType=" + this.data.dateType + "&days=" +
      this.data.days+"&name="+name;

    wx.navigateTo({
      url: '/pages/chart_detail/chart_detail?userBillsTypeId=' + userBillsTypeId + '&remake=' + remake + params
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
  onLoad: function () {
    wx.getSystemInfo({ // 获取当前设备的宽高，文档有
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    this.lineComponent = this.selectComponent('#mychart-dom-line');
  },

  init_line: function () {
    let that = this;
    let requestData = {
      url: ApiConst.getChartsData,
      data: {
        type: parseInt(that.data.index) + 1,
        dateType: that.data.dateType,
        days: that.data.days
      }
    }
    ApiManager.send(requestData, 'GET').then(res => {
      if (res.data.code == 1000) {
        that.initChart(res.data.data, that.data.dateType, that.data.index);
        var data = res.data.data;
        var totalMoney = 0;
        var avgMoney = 0;
        for (var i = 0; i < data.length; i++) {
          totalMoney = parseFloat(totalMoney) + parseFloat(data[i].sumMoney);

        }
        avgMoney = totalMoney / parseFloat(data.length);
        that.setData({
          totalMoney: totalMoney,
          avgMoney: avgMoney
        })

      }
    })
    //同时请求后端数据获得排行榜

    let requestData2 = {
      url: ApiConst.getChartsDataDetail,
      data: {
        type: parseInt(that.data.index) + 1,
        dateType: that.data.dateType,
        days: that.data.days
      }
    }
    ApiManager.send(requestData2, 'GET').then(res => {
      if (res.data.code == 1000) {

        that.setData({
          billsList: res.data.data,
        })
      }
    })
  },

  _getMenuList: function () {
    let that = this;
    let requestData = {
      url: ApiConst.getWeekOrDays,
      data: {
        dateType: that.data.dateType,
      }
    }
    ApiManager.send(requestData, 'GET').then(res => {
      if (res.data.code == 1000) {
        var menus = res.data.data;
        var left = menus.length - 1;
        that.setData({
          currentTab: menus.length - 1,
          days: menus[menus.length - 1].days,
        })
        var tabWidth = that.data.windowWidth / 5;
        that.setData({
          tabScroll: (left - 2) * tabWidth//使点击的tab始终在居中位置
        })
        that.setData({
          menuList: res.data.data,
        })
      }
      //数据添加完成,此时设置left值即可生效
      that.setData({
        tabScroll: that.data.tabScroll
      })
      that.init_line();
    })
  },
  //点击tab menu
  clickMenu: function (e) {
    var days = e.currentTarget.dataset.days; //获取当前tab的days
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
        currentTab: current,
        days: days
      })
      //this._getChartData()
      this.init_line()
    }
  },

  initChart: function (chartsData, dataType, type) {//type 0 1  还没有加1
    console.log(type)
    var xDate = [];
    var yValue = [];
    var year = "";
    var typeDesc = type == 0 ? "支出" : "收入"
    for (var i = 0; i < chartsData.length; i++) {
      if (dataType == 1) {
        xDate[i] = chartsData[i].days.substring(5, 10);
        yValue[i] = chartsData[i].sumMoney;
        year = chartsData[i].days.substring(0, 5);
      }
      if (dataType == 2) {
        xDate[i] = chartsData[i].days.substring(8, 10);
        year = chartsData[i].days.substring(0, 8);
        yValue[i] = chartsData[i].sumMoney;
      }
      if (dataType == 3) {
        xDate[i] = chartsData[i].days.substring(5, 7);
        year = chartsData[i].days.substring(0, 5);
        yValue[i] = chartsData[i].sumMoney;
      }

    }
    console.log(xDate, yValue)
    this.lineComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      var option = {
        backgroundColor: "#ffffff",
        color: ["#41C6AD"],
        legend: {
        },
        grid: {
          left: '1%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            //其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
            // 更改提示框的显示位置
            var x = point[0];//
            var y = point[1];
            var viewWidth = size.viewSize[0];
            var viewHeight = size.viewSize[1];
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];
            var posX = 0;//x坐标位置
            var posY = 0;//y坐标位置
            console.log()
            if (x < boxWidth) {//左边放不开
              posX = 5;
            } else {//左边放的下
              posX = x - boxWidth;
            }
            return [posX, y];
          },
          formatter: function (param, ticket, callback) {
            let list = param.length
            let Oparam = param
            let txt = "时间:" + year + param[0].name + "\n" + typeDesc + "金额:" + param[0].data + "元"
            return txt
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xDate,
          // show: false
        },
        yAxis: {
          x: 'center',
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
          // show: false
        },
        series: [{
          name: typeDesc,
          type: 'line',
          // smooth: true,
          data: yValue
        }]
      };
      chart.setOption(option);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  }
})



