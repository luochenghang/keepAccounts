const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
var util = require("../../utils/util.js");
var app = getApp();

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
    icon_type: '',
    out_iconList: '',
    in_iconList: '',
    data_out: {
      iconSelected: 0,
      notes: '',
      money: 0,
    },
    data_in: {
      iconSelected: 0,
      notes: '',
      money: 0,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var that = this    

    
   


    
    wx.request({      
      url: 'http://127.0.0.1:8000/acquire_icon',
      method: "GET",
      headers: {        
        'Content-Type': 'application/json'      
      },
        success: function(res) {             
        that.setData({
          out_iconList: res.data.out_iconList,
          in_iconList: res.data.in_iconList,
          current: 0,
          icon_type: '支出',
          icon_name: '餐饮'
        })   
      }    
    })
    // this.setData({
    //   // 设置current的值
    //   iconList: zhichu_iconList,
    //   icon_name: '餐饮',
    // })
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail);
    this.setData({
      date: e.detail.value
    })
  },


    // 请求获取标签
  _getOut_iconList:function(){
    let that = this;
    let requestData = {
      url: ApiConst.getUserBillsTypeList,
      data: { type: 1 }//支出
    }
    
    ApiManager.send(requestData, 'GET').then(res => {

      if (res.data.code == 1000) {
        that.setData({
          out_iconList: res.data.data,
          in_iconList: res.data.in_iconList,
          current: 0,
          icon_type: '支出',
          icon_name: '餐饮'
        }) 
      }
    })
  },

  // 请求获取标签
  _getIn_iconList: function () {
    let that = this;
    let requestData = {
      url: ApiConst.getUserBillsTypeList,
      data: { type: 2 }//支出
    }

    ApiManager.send(requestData, 'GET').then(res => {

      if (res.data.code == 1000) {
        that.setData({
          out_iconList: res.data.data,
          in_iconList: res.data.in_iconList,
          current: 0,
          icon_type: '支出',
          icon_name: '餐饮'
        })
      }
    })
  },

  // 标签点击
  iconClick: function(e) {
    // console.log('current: ',this.data.current);
    let data_out = this.data.data_out;
    let data_in = this.data.data_in;
    console.log(e)
    if (this.data.current === 0) {
      data_out.iconSelected = e.target.dataset.id;
      console.log(e.currentTarget.dataset.id)
      console.log(e.currentTarget.dataset.name)

      this.setData({
        data_out,
        icon_name: e.currentTarget.dataset.name,
        icon_url: e.currentTarget.dataset.url,

      })
    }
    if (this.data.current === 1) {
      data_in.iconSelected = e.target.dataset.id;
      console.log(e.currentTarget.dataset.id)
      console.log(e.currentTarget.dataset.name)
      this.setData({
        data_in,
        icon_name: e.currentTarget.dataset.name,
        icon_url: e.currentTarget.dataset.url,

      })
    }
  },

  outClick: function() {
    // 请求获取标签
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/acquire_icon',
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          out_iconList: res.data.out_iconList,
          current: 0,
          icon_type:'支出'
        })
      }
    })
    // this.setData({
    //   current: 0,
    //   icon_type: '支出'
    // });
  },
  inClick: function() {
    // 请求获取标签
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/acquire_icon',
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          in_iconList: res.data.in_iconList,
          current: 1,
          icon_type: '收入'
        })
      }
    })
    // this.setData({
    //   current: 1,

    //   icon_type: '收入',
    // });
  },
  changeCurrent: function(e) {
    this.setData({
      current: e.detail.current,
    });
  },

  //初始化日期
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail);
    this.setData({
      date: e.detail.value,
      year: e.detail.value.split('-')[0],
      month: e.detail.value.split('-')[1],
      day: e.detail.value.split('-')[2],
    })
  },
  //数字变换
  numInput: function(e) {
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
  ok: function(e) {
    console.log('已选中日期', this.data.date)
    console.log('获取金额', this.data.value)
    console.log('获取备注', this.data.remark)
    console.log('获取类型', e.currentTarget.dataset.type)
    console.log('获取标签', e.currentTarget.dataset.name)
    console.log('获取标签URL', e.currentTarget.dataset.url)
    // 组织参数
    var date = this.data.date
    var value = this.data.value
    var remark = this.data.remark
    var type = e.currentTarget.dataset.type
    var icon_name = e.currentTarget.dataset.name
    var icon_url = e.currentTarget.dataset.url
    var nick_name = this.data.nick_name
    console.log("获取昵称", nick_name)
    // 检测参数
    if(value == ""){
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
    if(icon_name == "" || icon_url == ""){
      wx.showToast({
        title: '请选择标签',
        icon: 'none',
        duration: 10000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
      return 
    }
    
    // 请求保存数据
    wx.request({
      url: 'http://127.0.0.1:8000/save_data',
      method: "POST",
      data:{
        "date": date,
        "value": value,
        "remark": remark,
        "type": type,
        "icon_name": icon_name,
        "icon_url": icon_url,
        "nick_name": nick_name,
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        // 跳转到明细页面
        wx.switchTab({
          url: '/pages/detail/detail',
        })
      }
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