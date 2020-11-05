const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    imgArr:[
      'https://wx1.sinaimg.cn/mw690/00612aBbgy1gfka77jwzxj30by0byjs7.jpg',
    ]

  },   
  previewImg:function(e){
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.imgArr;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
  // onLoad: function () { },
  // pageBack() {
    // wx.navigateBack({
    //   delta: 1
    // });

 
  // }
  
});

