// pages/buying/buying.js
Page({

  data: {
    array: [{
      mode: 'aspectFit',
      info: '同岩馆10次卡会员'
    }],
    src: '',
    times: '',
    price: '',
    limittime:'120',

  },
  


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function (option) {
    let that = this;
    console.log(option.price)
    that.setData({
      src:option.src,
      price:option.price,
      times:option.text
    })
  },
  getOpenId:function(code){
    var that = this;
    wx.request({
      url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
      data:{},
      method:'GET',
      success:function(res){
        that.setData({
          openid:res.data.openid,
          session_key:res.data.session_key,
        })
        that.generateOrder(res.data.openid)
      },
      fail:function(){
        //fail
      },
      complete:function(){
        //complete
      }
    })
  },
  //生成商户订单
  generateOrder:function(openid){
    console.log("进入生成商户订单函数")
    var that = this;
    wx.request({
      url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',//后台请求地址
      method:'GET',
      data:{
        gfee:that.price,
        gname:that.times,
        openId:openid,
        //商品价钱和名称根据具体情况传值，openid为唯一标识，必须传输
      },
      success:function(res){
        console.log("后台数据获取成功");
        console.log(res)
        var param = { "timeStamp": res.data.timeStamp, "package": res.data.package, "paySign": res.data.paySign, "signType": "MD5", "nonceStr": res.data.nonceStr };
          //发起支付
        that.pay(param);
      },
      fail:function(res){
        console.log("向后台发送数据失败")
      }
    })
  },
  pay:function(res){
    var that = this;
    console.log("发起支付");
    console.log(param);
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success:function(res){
        console.log("success");
        console.log(res);
      },
      fail:function(res){
        console.log("fail");
        console.log(res);
      },
      complete:function(res){
        console.log("complete");
        console.log(res)
      }
    })
  },
  wxPay:function(){
    var currTime = Date.parse(new Date());
    console.log("时间："+currTime);

    var t = this;
    wx.login({
      success:function(res){
        var opid = t.getOpenId(res.code)
      }
    })
    







    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) { 
        console.log(res)
        console.log("调用支付成功")
      },
      fail(res) { 
        console.log(res)
        console.log("调用支付失败")

      }
    })

  },
  check:function(){
    wx.navigateTo({
      url: '/pages/userP/userP',
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