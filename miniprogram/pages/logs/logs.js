// pages/logs/logs.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[
    ],


    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //验证登录
    if (!app.globalData.hasLogin) {
      wx.navigateBack({

      }),
      wx.showModal({
        title: '提示',
        content: '您未登录',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('用户点击确定')
            
          } else {//这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    }
    else{
      wx.request({
        url: 'https://www.yipan.club/a/yipan/ypSignInManagement/list/'+app.globalData.openid,
  
        success:function(res){
          console.log(res.data)
    
          that.setData({
            listData:res.data,
          })
          
        }
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