const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //会员信息 字段与后端接收保持一致 后面可以根据需求增加
    ypMember:{
      openid:'',
      sex:'',
      phone:'',
      carduser:'',
      encryptedData:'',
      iv:'',
    },
    wxId:"",
    phone:"",
    avatar: "",//用户头像
    nickname: "点击登录",//用户昵称
    gender:"",
    sex:"",
    // beans:0,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    showLoginDialog:false,
    login : false,
      
  },

//1、判断是否授权
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
        //  that.data.login = true;
         that.setData({
          login:true
         })
         that.onWechatLogin();
        } 
        else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  
//2、开始授权
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
   //   console.log("用户的信息如下：");
    //  console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false, 
        showLoginDialog: true,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
      })
      // this.onWechatLogin()
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
        //    console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

//判断是否已经授权
  auth: function () {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
         // console.log("未授权")
          wx.showModal({
            title: '授权',
            content: '需要获取您的信息',
            success:function(res){
              if(res.confirm)(
                wx.openSetting({
                  success(res) {
                  //  console.log("打开授权")
                    wx.authorize({
                      scope: 'scope.userInfo',
                      success: function (res) {
                  //      console.log("shouquanchenggong!!!!!"),
                         // console.log(res)
                      }
                    })
                 //   console.log(res.authSetting)
                    res.authSetting = {
                      "scope.userInfo": true,
                      "scope.userLocation": true
                    }
                  },
                  fail: function (res) {
                 //   console.log("打开授权失败"),
                   //   console.log(res)
                  },
                })
              )
            }
          })
          wx.openSetting({
            success(res) {
            //  console.log("打开授权")
              wx.authorize({
                scope: 'scope.userInfo',
                success:function(res){
               //   console.log("shouquanchenggong!!!!!"),
                //  console.log(res)
                }
              })
            //  console.log(res.authSetting)
              res.authSetting = {
                "scope.userInfo": true,
                "scope.userLocation": true
              }
            },
            fail:function(res){
            //  console.log("打开授权失败"),
             // console.log(res)
            },
          })
        }
      },
      fail:function(res){
      //  console.log("询问授权失败"),
      //  console.log(res)
      }
    })
  },

  //转到我的会员卡页面
  myHYClick:function(){
    console.log("点击了我的会卡的按钮")
    if(!app.globalData.hasLogin){
      wx.showModal({
        title: '提示',
        content: '您未登录',
        success: function (res) {
          if (res.confirm) {
           // console.log('用户点击确定')
          } else {//这里是点击了取消以后
         //   console.log('用户点击取消')
          }
        }
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/myHY/myHY',
      })
      
    }
  },

  //转到签到记录的页面
  myLogClick:function(){

    console.log("点击了签到记录的按钮")
    if (!app.globalData.hasLogin) {
      wx.showModal({
        title: '提示',
        content: '您未登录',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
           // console.log('用户点击确定')
          } else {//这里是点击了取消以后
           // console.log('用户点击取消')
          }
        }
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/logs/logs',
      })

    }
  },
  //转到我的打卡签到
  myScanCodeClick:function(){
   // console.log("点击了签到的按钮")
    if (!app.globalData.hasLogin) {
      wx.showModal({
        title: '提示',
        content: '您未登录',
        success: function (res) {
          if (res.confirm) {
          //  console.log('用户点击确定')
          } else {//这里是点击了取消以后
          //  console.log('用户点击取消')
          }
        }
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/scanCode/scanCode',
      })

    }
  },
    //转到我的订单的页面
    myOrderClick:function(){
      // console.log("点击了签到的按钮")
       if (!app.globalData.hasLogin) {
         wx.showModal({
           title: '提示',
           content: '您未登录',
           success: function (res) {
             if (res.confirm) {
             //  console.log('用户点击确定')
             } else {//这里是点击了取消以后
             //  console.log('用户点击取消')
             }
           }
         })
       }
       else {
         wx.navigateTo({
           url: '/pages/order/order',
         })
   
       }
     },
  //转到联系我们的页面
  contactClick:function(){
   // console.log("点击了联系我们的按钮")
      wx.navigateTo({
        url: '/pages/contact/contact',
      })
  },
  luckyClick:function(){
    if(app.globalData.openid){
      wx.navigateTo({
        url:'/pages/luckDraw/luckDraw'
      })
    }else{
      wx.showModal({
        title: '提示',
        content:'请稍等，登录后再抽奖',
      })
    }
   },
 


/**
 * 微信登录
 */
   onWechatLogin:function(){
     console.log(app.globalData.hasLogin)
    if(!app.globalData.hasLogin){
      var that = this;
      var wxId = '';
      var gender = '';
      var nickname = '';
      var code = '';
      // this.auth();
      console.log("微信登录")
      wx.login({
        success: function (res) {
          code = res.code;
          that.data.ypMember.openid = code;
          //获取用户基本信息
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userInfo = res.userInfo;
              that.data.ypMember.carduser = res.userInfo.nickName;
              if(res.userInfo.gender == 1){
                that.data.ypMember.sex = "男";
              }
              if(res.userInfo.gender == 2){
                that.data.ypMember.sex = "女";
              }

              app.globalData.hasLogin = true;
              gender = res.userInfo.gende;
              nickname = res.userInfo.nickName;

            //获取用户openid和易豆
              if(that.data.login){
                wx.request({
                  url: 'https://www.yipan.club/a/yipan/ypMember/login', 
                  method:'POST',
                  data:JSON.stringify(that.data.ypMember),
                  header: {
                    'content-type': 'application/json'
                  },
                  success:function(res){
                   // console.log(res)
                    if(res.data.code === 'success'){
                      let code = res.data.code;
                      let message = res.data.message;
                      app.globalData.code = code;
                      app.globalData.openid = message;
                      wx.setStorage({
                        key: "openid",
                        data: app.globalData.openid
                      })
                      wx.getStorage({
                        key: 'openid',
                        success(res) {
                          console.log("Storage缓存获取的值："+res.data)
                        }
                      })
                      // that.setData({
                      //   beans : res.data.beans,
                      //   })
                    }
                  },
                }),
                that.setData({
                  avatar: res.userInfo.avatarUrl,
                  nickname: res.userInfo.nickName,
                  gender:res.userInfo.gender,
                });
              }
              else {
                if(that.data.login){
                wx.showToast({
                  title:"登录失败！请重试" ,
                  icon: 'none', 
                  duration: 2000, 
                  mask: true,
                })
              }
              }
            },
            fail:function(res){
              console.log(res)
              wx.showToast({
                title: "登录失败，请重试",//提示文字
                duration:2000,//显示时长
                mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                icon:'success', //图标，支持"success"、"loading"  
                success:function(){ },//接口调用成功
                fail: function () { },  //接口调用失败的回调函数  
                complete: function () { } //接口调用结束的回调函数  
             })
            }
          });
        }
      })
    }
  },
  
//获取手机号
  getPhoneNumber: function (e) {
    var that = this;
    if(e.detail.errMsg == "getPhoneNumber:ok"){
      that.data.ypMember.encryptedData = e.detail.encryptedData;
      that.data.ypMember.iv = e.detail.iv;
      that.data.login=true
      console.log(app.globalData.hasLogin)
     
      that.onWechatLogin();
    }
  this.setData({
    showLoginDialog:false
  })
   
  },
})