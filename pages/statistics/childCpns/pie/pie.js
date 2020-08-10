// pages/statistics/childCpns/pie/pie.js
import * as echarts from '../../../../ec-canvas/echarts';
import { getOption } from '../../../../utils/statistics.js'
const app = getApp()
var pieChart= null

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
    ec: {
      // 初始化图表
      onInit: function (canvas, width, height, dpr) {
        pieChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
        });
        canvas.setChart(pieChart);
        return pieChart
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click: function(){
      console.log('点击饼图')
    }
  },
  pageLifetimes: {
    show: function(){
      console.log("show", app.globalData.addPage)
      //只对支出的钱进行统计
      getOption(app.globalData.addPage, pieChart,0)
      // //监听图表的事件
      // pieChart.on('click',function(params){
      //   console.log(params)
      // })

    }
  }
})
