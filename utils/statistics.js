// 1.获取到全局变量addPage进行处理
//1.1 把所有类别的颜色集中到一起 -> option中的color
const iconColor = (addPage,tab) => {
  const newAddPage = addPage.filter( value => value.selectedTab === tab)
  
  const colorArr =  newAddPage.map(function (item) {
    return item.iconBgcolor
  })
  // console.log('iconBgColor', Array.from(new Set(colorArr)))
  // 如果有相同的颜色则去掉，数组去重
  return Array.from(new Set(colorArr))
}

//1.2 把所有项目的名称和钱数放到一起 -> series中的data
const seriesData = (addPage,tab) =>{
  const newAddPage = addPage.filter(value => value.selectedTab === tab)
  // console.log('newAddPage',newAddPage)
  const oldData = newAddPage.map(function (item) {
    return { value: item.moneyValue, name: item.iconName }
  })
  // console.log('oldData',oldData)
  // 把相同项的数值求和归并到一起,格式：{a:6，b:8}
  let result = {};
  oldData.forEach(item => {
    if(result[item.name]){
      result[item.name] += parseFloat(item.value)
    }else{
      result[item.name] = parseFloat(item.value)
    }
  })
  // console.log('reslut',result)
  // 把result转化成自己想要的，格式：[{key:'a',value:6},{key:'b',value:8}]
  let newData = []
  for(let k in result){
    newData.push({name: k,value: result[k]})
  }
  // console.log('newData', newData)
  return newData
}

/*1.3 获取echart的option: 
      addPage是获取到记账的所有数据；
      chart是定义的chart实例；
      tab是指当前是收入还是支出： 0 为支出，1为收入*/
const getOption = (addPage, chart, tab) => {
  // 1. 判断app.globaData.addPage是否有值
  if (addPage.length === 0) {
    //没有值，就弹出提示
    // wx.showToast({
    //   icon: 'none',
    //   title: '请先添加数据！！',
    // })
    //并且跳转到bill页面
    // setTimeout(() => {
    //   wx.switchTab({
    //     url: '/pages/bill/bill',
    //   })
    // }, 2000)
  } else {
    //1.编写option 定义pie的option
    let title = '总支出';
    let color = iconColor(addPage, tab)
    let echartData = seriesData(addPage, tab)

    let formatNumber = function (num) {
      let reg = /(?=(\B)(\d{3})+$)/g;
      return num.toString().replace(reg, ',');
    }
    let total = echartData.reduce((a, b) => {
      return a + b.value * 1
    }, 0);

    const pieOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{b|{b}：}\n{per|{d}%}'
      },
      title: [{
        text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
        top: 'center',
        left: 'center',
        textStyle: {
          rich: {
            name: {
              fontSize: 13,
              fontWeight: 'normal',
              color: '#666666',
              padding: [10, 0]
            },
            val: {
              fontSize: 20,
              color: '#333333',
            }
          }
        },
        // triggerEvent: true
      }],
      backgroundColor: "#ffffff",
      color: color,
      series: [{
        label: {
          formatter: '{b} {d}%',
        },
        type: 'pie',
        itemStyle: {
          normal: {
            borderColor: '#fff',
            borderWidth: 2
          }
        },
        center: ['50%', '50%'],
        radius: ['40%', '60%'],
        data: echartData
      }]
    }
    // 2. 设置option
    return chart.setOption(pieOption)
  } 
}
module.exports = {
  iconColor: iconColor,
  seriesData: seriesData,
  getOption: getOption
}