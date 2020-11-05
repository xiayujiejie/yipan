// pages/orderset/orderset.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOrder:1,
    ypParam:{
      openid:null,
      orderid:null,
      commodityId:null,
    },
    order:[],
  },



  trigger:function(e){
    var that = this;
    let openid = app.globalData.openid;
    if(openid == null){
      that.show('你是谁？我怎么把卡交给你？','none',false);
    }else{
       wx.showModal({
         title: '',
         content: '确认购买易攀一通卡？',
         success(res) {
         if (res.confirm) {
          wx.request({
            url: 'https://www.yipan.club/a/yipan/ypPay/wxPay',
            method: 'POST',
            data:JSON.stringify(that.data.order),
            success:function(res){
              if(res.data.result === 'SUCCESS'){
                that.previewImg(res.data);
              }else{
                that.show(res.data.result,'none',false);
              }
            }
          })
         } else if (res.cancel) {
             that.show('调皮，是想重新再点我一次？','none',false);
          }
         }
        })
    }
  },

previewImg:function(param){
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.packages,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {
          // success
          wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
              success: function (res) {
                that.show('支付成功','success',false);
              },
              fail: function () {
              },
              complete: function () {
              }
          })
      },
      fail: function (res) {
        that.show('支付失败','none',false);
      },
      complete: function () {
      }
    })
},


show:function(t,i,b){
  wx.showToast({
    title: t,
    icon: i,
    duration: 2000,
    mask:b,
})
},

goBackUrl:function(){
  wx.switchTab({
    url: '/pages/BuyingCards/BuyingCards',
    }) 
},

cancelOrder: function(){
  var that = this;
  wx.showModal({
    title: '',
    content: '请确认是否要取消此订单',
    success(res) {
    if (res.confirm) {
     wx.request({
       url: 'https://www.yipan.club/a/yipan/yporder/cancelOrder',
       method: 'POST',
       data:JSON.stringify(that.data.order),
       success:function(res){
         if(res.data.result === 'success'){
          that.show(res.data.message,'none',false);
          wx.switchTab({
            url: '/pages/order/order',
            }) 
         }else{
           that.show(res.data.message,'none',false);
         }
       }
     })
    } else if (res.cancel) {
     }
    }
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.data.ypParam.openid = app.globalData.openid;
    that.data.isOrder = options.isOrder;
    that.setData({ isOrder:options.isOrder });
    if(that.data.isOrder == 1){
      that.data.ypParam.commodityId = options.id;
      that.data.ypParam.orderid = null;
    }else{
      that.data.ypParam.orderid = options.id;
      that.data.ypParam.commodityId = null;
    }
    wx.request({
      url: 'https://www.yipan.club/a/yipan/yporder/reqOrder',
      method: 'POST',
      data:JSON.stringify(that.data.ypParam),
      success:function(res){
        if(res.data.result === 'SUCCESS'){
          that.setData({
            order:res.data,
          })
        }else{
          that.show(res.data.result,'none',false);
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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