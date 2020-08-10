const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
var util = require("../../utils/util.js");


//获取应用实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remark: '',
    date: util.formatDate(new Date()),
    value: '',
    nick_name: "",
    ico_name: '',
    icon_url: '',
    selectedIconId: 0,
    icon_type: 1,
    iconList: [],
    current: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

  },
  onShow: function () {
    this._getIconList();
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail);
    this.setData({
      date: e.detail.value
    })
  },

  // 请求获取标签
  _getIconList: function () {

    let that = this;
    let requestData = {
      url: ApiConst.getUserBillsTypeList,
      data: { type: that.data.icon_type }
    }
    ApiManager.send(requestData, 'GET').then(res => {

      if (res.data.code == 1000) {
        that.setData({
          iconList: res.data.data,
          selectedIconId: res.data.data[0].id,
        })
      }
    })
  },


  // 标签点击
  iconClick: function (e) {
    this.setData({
      selectedIconId: e.target.dataset.id
    })
  },

  outClick: function () {
    // 请求获取标签
    this.setData({
      current: 1,
      icon_type: 1
    });
    this._getIconList();
  },
  inClick: function () {
    this.setData({
      current: 2,
      icon_type: 2
    });
    this._getIconList();
  },
  changeCurrent: function (e) {
    this.setData({
      current: e.detail.current,
    });
  },

  // //初始化日期
  // bindDateChange: function(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail);
  //   this.setData({
  //     date: e.detail.value,
  //     year: e.detail.value.split('-')[0],
  //     month: e.detail.value.split('-')[1],
  //     day: e.detail.value.split('-')[2],
  //   })
  // },
  //数字变换
  numInput: function (e) {
    let type = e.target.dataset.type;
    if (type === 'num') {
      let num = e.target.dataset.num;
      //判断是不是点
      if (num === '.') {
        if (this.data.value === '') {
          this.setData({
            value: '0.'
          })
        } else if (this.data.value.indexOf('.') != -1) {
          //不允许输入多个点
        } else {
          this.setData({
            value: this.data.value + num
          })
        }
      } else {
        //如果第一个字符为0，现在输入第二个字符，则自动变为0.
        if (this.data.value === '0' && num !== '.') {
          this.setData({
            value: '0.' + num
          })
        } else {
          let length = this.data.value.length;
          let index = this.data.value.indexOf('.');
          //这是不让他输入太多位小数，默认为2位
          if (index != -1 && (length - index) > 2) {
            return;
          }
          this.setData({
            value: this.data.value + num
          })
        }
      }
      //判断删除操作
    } else if (type === 'del' && this.data.value !== '') {
      if (this.data.value === '0.') {
        this.setData({
          value: ''
        })
      } else {
        this.setData({
          value: this.data.value.substring(0, (this.data.value.length - 1))
        })
      }
    } else if (type === 'empty') {
      this.setData({
        value: ''
      })
    }
    var myEventDetail = {
      value: this.data.value
    } // detail对象，提供给事件监听函数
    var myEventOption = {} // 触发事件的选项
    this.triggerEvent('numChange', myEventDetail, myEventOption)
  },
  //确定
  ok: function (e) {
    console.log('已选中日期', this.data.date)
    console.log('获取金额', this.data.value)
    console.log('获取备注', this.data.remark)
    console.log('获取类型', e.currentTarget.dataset.type)
    console.log('selectedIconId', this.data.selectedIconId)
    // 组织参数
    var date = this.data.date
    var value = this.data.value
    var remark = this.data.remark
    var type = e.currentTarget.dataset.type


    // 检测参数
    if (value == "") {
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
    var params = {
      userBillsTypeId: this.data.selectedIconId,
      type: type,
      money: value,
      remake: remark,
      createDate: date
    }
    let that = this;
    let requestData = {
      url: ApiConst.addBills,
      data: params
    }
    ApiManager.send(requestData, 'POST').then(res => {

      if (res.data.code == 1000) {
        wx.switchTab({
          url: '/pages/detail/detail',
        })
      }
    })
  },
  setting(){
    wx.navigateTo({
      url: '/pages/bills_type/bills_type?type='+ this.data.current,
    })
  },

  dateInput(event) {
    this.initDate(new Date(event.detail))
    this.onClose();
  },
  showDateSelect() {
    this.setData({
      show: true
    });
  },
  //关闭选择日期
  onClose() {
    this.setData({
      show: false
    });
  },
  remarkInput(e) {
    this.data.remark = e.detail.value
  }
})