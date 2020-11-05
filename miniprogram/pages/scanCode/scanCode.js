const app = getApp();
Page({
  data:{
     //下拉框数据
     selectArray: [
    ],
    selectIndex:0,
    cardHolder:[],
    cardHolderIndex:0,
    cardno:'',
    rockno:'',
    balance:'',//余额
    deduction:'',//应扣次数
    unitPrice:'',//单价
    unitPrice_10:'',//10次卡单价
    unitPrice_20: '',//20次卡单价
    beans:'',//易豆变化
    priceShow:false
  },


  onLoad: function (options) {
    var that = this;
    console.log("开始获取岩馆信息。。。");
    //下拉框获取数据
    wx.request({
      //参数在这补充
      url: 'https://www.yipan.club/a/yipan/ypRockHall/mlist',
      success(res){

          that.setData({
            selectArray:res.data,
          })
      }
    })
    var openId = app.globalData.openid;
    wx.request({
      //卡信息获取
      url: 'https://www.yipan.club/a/yipan/ypCardHolder/list/'+openId,
  
      success(res){
        if(res.data.length > 0){
          for(var index = 0;index<res.data.length;index++){
            if(res.data[index].text == "V10_GOLD"){
              res.data[index]['name'] = '黄金10次卡';
            }
            if(res.data[index].text == "V20_DIAMOND"){
              res.data[index]['name'] = '钻石20次卡';
            }
          }
          that.setData({
            cardHolder:res.data,
            cardno:  res.data[0].id,            
          })
        }
      }
    })

    //获取易豆
    wx.request({
      //卡信息获取
      url: 'https://www.yipan.club/a/yipan/ypMember/getBeans/' + openId,

      success(res) {
        // console.log(res)
          that.setData({
            balance: res.data,
          })
      }
    })
    
  },
  selectEvent1:function(option){
    console.log(option);
    var that = this;
    that.setData({
      rockno:option.detail.selectedID
    })
    
  },
  selectEvent2:function(option){
    console.log(option);
    var that = this;
    that.setData({
      cardno:option.detail.selectedID
    })
  },

  //确认签到
  wxSign:function(options){
    console.log(this.data.rockno);
    
    if(this.data.rockno != '' && this.data.cardno!=''){
      wx.request({
        url: 'https://www.yipan.club/a/yipan/ypSignInManagement/debit/'+app.globalData.openid+'/'+this.data.cardno+'/'+this.data.rockno,
        method:'GET',
        success:function(res){
          console.log("请求成功"+res);
          console.log(res.data);
          if(res.data.success){
            // wx.showToast({
            //   title: '打卡成功',
            //   duration: 2000, //确定文字的颜色
            //   mask: true,
            // })
            wx.showModal({
              title:'打卡成功！',
              confirmText: "我知道了",
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  //点击确定按钮
                } else if (res.cancel) {
                  //点击取消按钮
                }
              }
            })
          }
          else{
            // wx.showToast({
            //   title:res.data.message,
            //   icon: 'none', //确定文字的颜色
            //   duration: 2000, //确定文字的颜色
            //   mask: true,
            // })
            wx.showModal({
              title:res.data.message,
              confirmText: "再试一下",
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  //点击确定按钮
                } else if (res.cancel) {
                  //点击取消按钮
                }
              }
            })
          }
          
        }
      })
    }
    else{
      if(this.data.rockno == ''){
        wx.showModal({
          title:'提示',
          content:'请选择岩馆',
          showCancel:false,
          confirmText:'重新选择',
          cancelColor: 'blue',
          success:function(res){
  
          }
        })
      }
      console.log(this.data.cardno);
      if(this.data.cardno == ''){
        wx.showModal({
          title:'提示',
          content:'请选择会员卡',
          showCancel:false,
          confirmText:'重新选择',
          cancelColor: 'blue',
          success:function(res){
            
          }
        })
      }
    }

    
  },
  PickerChange1: function (e) {
    var that = this;
    this.setData({
      rockno: that.data.selectArray[e.detail.value].id,
      selectIndex: e.detail.value,
      unitPrice_10: that.data.selectArray[e.detail.value].v10_DIAMOND,
      unitPrice_20: that.data.selectArray[e.detail.value].v20_DIAMOND
    })
    if(that.data.rockno && that.data.cardno){
      that.setData({
        priceShow:true
      })
    }
    that.getInfo();
  },
  PickerChange2: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      cardno:  that.data.cardHolder[e.detail.value].id,
      cardHolderIndex: e.detail.value
    })
    if(that.data.rockno && that.data.cardno){
      that.setData({
        priceShow:true
      })
    }
    that.getInfo();
  },
  getInfo:function(){
    var that = this;
    var cardType = that.data.cardHolder[that.data.cardHolderIndex].text;
    var deduction=0,beans='';
    //单价
    if (cardType == 'V20_DIAMOND') {
      that.setData({
        unitPrice: that.data.unitPrice_20
      })
    } else if (cardType == 'V10_GOLD') {
      that.setData({
        unitPrice: that.data.unitPrice_10
      })
    }
    // console.log(that.data.unitPrice)
    //应扣次数
    if (cardType == 'V10_GOLD'){
      if (that.data.unitPrice>90){
        if (that.data.balance>= (that.data.unitPrice-90)){
          deduction = 1
          beans = '-' + (that.data.unitPrice - 90)
        }else{
          deduction = 2
          beans = '+' + (90 * 2 - that.data.unitPrice)
        }
      } else{
        deduction = 1
        beans = '+' + (90 - that.data.unitPrice)
      }
    } else if (cardType == 'V20_DIAMOND') {
      if (that.data.unitPrice > 84) {
        if (that.data.balance >= (that.data.unitPrice - 84)) {
          deduction = 1
          beans = '-' + (that.data.unitPrice - 84)
        } else {
          deduction = 2
          beans = '+' + (84 * 2 - that.data.unitPrice )
        }
      } else {
        deduction = 1
        beans = '+' + (84 - that.data.unitPrice)
      }
    }
    // console.log('deduction',deduction);
    // console.log('beans', beans)
    that.setData({
      deduction: deduction,
      beans: beans
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

