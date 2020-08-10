import * as echarts from '../../../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    color: ["#FFD089", "#9B83FF", "#64D1B8"],
    legend: {
      data: ['支出', '收入', '预算'],
      top: 20,
      left: 'center',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
      name: '支出',
      type: 'line',
      smooth: true,
      data: [129381.6, 13521.04, 15249.02, 6138.72]
    }, {
      name: '收入',
      type: 'line',
      smooth: true,
      data: [144042.8, 27056, 26609, 26000]
    }, {
      name: '预算',
      type: 'line',
      smooth: true,
      data: [13154, 13154, 13154, 13154]
    }]
  };

  chart.setOption(option);
  return chart;
}

Component({
  properties: {
    currentIndex: Number
  },

  data: {
    ec: {
      onInit: initChart
    }
  }
});
