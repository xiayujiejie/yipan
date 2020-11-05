// pages/order/order.js
const app = getApp();
Page({
 
  /**
  * 页面的初始数据
  */
  data: {
  currtab: 0,
  swipertab: [{ name: '待付款', index: 0 }, { name: '已完成', index: 1 }],
  order:{
    openid:'',
    statuscd:'',
  },
  orderList:[],
  },
   


  orderUrl:function(e){
    let id = e.currentTarget.dataset.orderid;
    let isOrder = 2;
    console.log(isOrder)
    wx.navigateTo({
      url: '/pages/orderset/orderset?id='+id+'&isOrder='+isOrder,
    })
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
  // 页面渲染完成
  this.getDeviceInfo()
  this.orderShow()
  },
   
  getDeviceInfo: function () {
  let that = this
  wx.getSystemInfo({
  success: function (res) {
  that.setData({
  deviceW: res.windowWidth,
  deviceH: res.windowHeight
  })
  }
  })
  },
   
  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
  var that = this
  if (this.data.currtab === e.target.dataset.current) {
  return false
  } else {
  that.setData({
  currtab: e.target.dataset.current
  })
  }
  },
   
  tabChange: function (e) {
  this.setData({ currtab: e.detail.current,orderList : [] })
  this.orderShow()
  },
   
  orderShow: function () {
  let that = this
  switch (this.data.currtab) {
  case 0:
  that.alreadyShow()
  break
  case 1:
  that.waitPayShow()
  break
  }
  },
  alreadyShow: function(){
    let that = this
    that.data.order.statuscd = 1000;
    that.data.order.openid =  app.globalData.openid;
    wx.request({
      url: 'https://www.yipan.club/a/yipan/yporder/reqOrderList',
      method: 'POST',
      data:JSON.stringify(that.data.order),
      success:function(res){
        that.setData({
          orderList : res.data
        })
      }
    })
  },
   
  waitPayShow:function(){
    let that = this
    that.data.order.statuscd = 1200;
    that.data.order.openid =  app.globalData.openid;
    wx.request({
      url: 'https://www.yipan.club/a/yipan/yporder/reqOrderList',
      method: 'POST',
      data:JSON.stringify(that.data.order),
      success:function(res){
        that.setData({
          orderList : res.data
        })
      }
    })
  },
   

   
   
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
   
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