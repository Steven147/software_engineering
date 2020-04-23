//app.js

var app = getApp()

App({
  onLaunch: function () {
    wx.cloud.init({
      env: "cloud-14ij5"
    })
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  
  },

    globalData: {
      userInfo: null,
      overallWordList: [{

      }],
      timeBegin:"",
      timeEnd:""
    },
  //拉取单词
  getlist() {
    var that = this 
    wx.cloud.database().collection("list").get({
      success: res => {
        console.log("获取成功", res)
        that.globalData.overallWordList = res.data
        console.log("yes",that.globalData.overallWordList)
      },
      fail(res) {
        console.log("获取失败", res)
      }
    })

  },
    //记忆指数初次确定函数
    //k1:音频点击次数权值（负相关）
    //k2:单词熟悉程度权值（太简单：0,下一个：1,仍需记忆：2）(负相关)
    //k3:单词选择正确尝试次数（1,2,3,4）(负相关)
    //k4:学习阶段停留时间(负相关)
    //k5:测试阶段停留时间(负相关)
    calc_memory_num: function(k1,k2,k3,k4,k5){
      var list=this.globalData.localWordList;
      console.log('**************');
      console.log(list);
      for(var i=0;i<list.length;++i){
       if (list[i].isSelected===1) list[i].memory_num=100;
      }
      console.log(list);
      console.log('**************');
      //记忆指数加权计算
      var p1,p2,p3,p4,p5 //分别对应同下标权值的分值
      for (var i = 0; i < list.length; ++i) {
        p1 = 100 * Math.exp(-list[i].radioClickNum)
        
        if (list[i].primaryPoint == 0) p2 = 70
        if (list[i].primaryPoint == 1) p2 = 30
        if (list[i].primaryPoint == 2) p2 = 0
        
        if (list[i].tryNum == 1) p2 = 80
        if (list[i].tryNum == 2) p2 = 50
        if (list[i].tryNum == 3) p2 = 20
        if (list[i].tryNum == 4) p2 = 0

        p4 = 100 * Math.exp(-list[i].learnTime)
        p5 = 100 * Math.exp(-list[i].testTime)

        list[i].memory_num = k1*p1 + k2*p2 + k3*p3 + k4*p4 + k5*p5
      }
    },
    //记忆指数修正函数
    recalc_memory_num: function (k1, k2, k3, k4, k5) {
      var list = this.globalData.localWordList;
      console.log('**************');
      console.log(list);
      for (var i = 0; i < list.length; ++i) {
        if (list[i].isSelected === 1) list[i].memory_num = 1000;
      }
      console.log(list);
      console.log('**************');
      //记忆指数加权计算
      var p1, p2, p3, p4, p5 //分别对应同下标权值的修正
      for (var i = 0; i < list.length; ++i) {
        p1 = 100 * (Math.exp(-list[i].radioClickNum)-0.5)

        if (list[i].primaryPoint == 0) p2 = 20
        if (list[i].primaryPoint == 1) p2 = 0
        if (list[i].primaryPoint == 2) p2 = -20

        if (list[i].tryNum == 1) p2 = 30
        if (list[i].tryNum == 2) p2 = 10
        if (list[i].tryNum == 3) p2 = -10
        if (list[i].tryNum == 4) p2 = -30

        p4 = 100 * (Math.exp(list[i].learnTime) - 0.5)
        p5 = 100 * (Math.exp(list[i].testTime) - 0.5)

        list[i].memory_num += k1 * p1 + k2 * p2 + k3 * p3 + k4 * p4 + k5 * p5
        //边值确定
        if (list[i].memory_num > 100) list[i].memory_num = 100
        if (list[i].memory_num < 0) list[i].memory_num = 0
    }
  },
 
})