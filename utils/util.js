const toast = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'none'
  })
}
const loginTip = (msg) => {
  wx.showModal({
    title: '提示',
    showCancel: false,
    content: msg,
    confirmColor: '#FFB000',
    success: function (res) {

    }
  })
}



/**
 * 获取系统信息同步方法
 */
function getSystemInfoSync() {
  return new Promise(resolve => {
    try {
      const res = wx.getSystemInfoSync();
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
}
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatYearMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return year + "年" + month + "月"
}


const formatYear = date => {
  const year = date.getFullYear()

  return year
}

const formatMonth = date => {
  const month = date.getMonth() + 1

  return [month].map(formatNumber)
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function regexConfig() {
  var reg = {
    email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    phone: /^1(3|4|5|7|8)\d{9}$/
  }
  return reg;
}
module.exports = {
  loginTip,
  toast,
  getSystemInfoSync,
  formatTime: formatTime,
  formatDate: formatDate,
  formatYearMonth: formatYearMonth,
  formatYear: formatYear,
  formatMonth: formatMonth,
  regexConfig: regexConfig
}