const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  AYclub:function(option){
    //此处跳转到显示公众号页面的功能，暂时有问题 2020.6.7
    // wx.navigateTo({
    //   url: '/pages/web/web?linkWeb='+"https://mp.weixin.qq.com/s/YffScfPJahJIEPvi6VuouQ",
    // })
  },
});
