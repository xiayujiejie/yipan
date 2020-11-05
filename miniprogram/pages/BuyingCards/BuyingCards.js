// pages/BuyingCards/BuyingCards.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      card:[
       {
         id: '603a6b02446841908cca81ccff8d4dbc',
         src: '/static/images/10.png',
       },
       {
        id: 'f45279e875d64c0588e11993e33ff142',
        src: '/static/images/20.png',
       },
      ],
     
  }, 

  orderUrl:function(e){
    if(!app.globalData.hasLogin){
      wx.showToast({
        title: '先登录才能购卡',
        icon: 'none',
        duration: 2000,
        mask:false,
    })
    }else{
      let id = e.currentTarget.dataset.id;
      let isOrder = 1;
      wx.navigateTo({
        url: '/pages/orderset/orderset?id='+id+'&isOrder='+isOrder,
      })
    }
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