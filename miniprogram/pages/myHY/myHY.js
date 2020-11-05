// pages/myCenter/myCenter.js
const app = getApp();
Page({

  data: {
    ypMember:{
      openid:'',
      sex:'',
      phone:'',
      carduser:'',
      encryptedData:'',
      iv:'',
    },
    array: [],
    src: '/static/images/huangjin.png',
    myCenter:'',
    ishide: false,
    beans:0
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //验证登录
    if(!app.globalData.hasLogin){
      wx.navigateBack({

      })
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
    wx.request({
      // url: 'http://localhost:8080/yipan/a/yipan/ypMember/?openid='+openId,
      url:'https://www.yipan.club/a/yipan/ypCardHolder/lost/'+app.globalData.openid,
      header: {
        'content-type': 'application/json'
      },
      method:'GET',
  
      success:function(res){
          for(var index = 0;index<res.data.length;index++){
            if(res.data[index].cardType == "V10_GOLD"){
              res.data[index].cardType = '黄金10次卡';
            }
            if(res.data[index].cardType == "V20_DIAMOND"){
              res.data[index].cardType = '钻石20次卡';
            }
          }
          that.setData({
            ishide: true,
            myCenter:"",
            array:res.data
          })    
      }    
    }),
    wx.request({
      url: 'https://www.yipan.club/a/yipan/ypMember/getBeans/'+app.globalData.openid, 
      method:'POST',
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
      //  console.log("huoqushuju "+res.data)
       that.setData({
        beans : res.data,
        })
        // if(res.data.code === 'success'){
        //   let code = res.data.code;
        //   let message = res.data.message;
        //   app.globalData.code = code;
        //   app.globalData.openid = message;
        //   that.setData({
        //     beans : res.data.beans,
        //     })
        // }
      },
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