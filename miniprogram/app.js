//app.js
var fetchWechat = require('fetch-wechat');
var tf = require('@tensorflow/tfjs-core');
var plugin = requirePlugin('tfjsPlugin');

var app = getApp()

App({
  onLaunch: function () {
    wx.cloud.init({
      env: "cloud-14ij5"
    })
    
    //神经网络tensorflow插件
    plugin.configPlugin({
      // polyfill fetch function
      fetchFunc: fetchWechat.fetchFunc(),
      // inject tfjs runtime
      tf,
      // provide webgl canvas
      canvas: wx.createOffscreenCanvas()
    });
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
      recommendWordList:[{

      }],
      orderFinished:false,
      rememberList:[],
      rememberNow:'',
      timeBegin:"",
      timeEnd:"",
      totalLearnTime:0,
      flagForIndentify:0,
      db_id:"",
      db_m_n:0,
      db_word:"",
      db_userx:"",
      db_inc_time:0,
      wordfetch:[{}],
      wordfetch_flag:false,
      localStorageIO: plugin.localStorageIO
    },
  //拉取单词
  getlist() {
    var that = this 
    wx.cloud.database().collection("super").get({
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

  //*********************修改单词记忆指数****************************
  //修改记忆指数super
  updData() {
    wx.cloud.callFunction({
      name: "updlist",
      data: {
        _id: this.globalData.db_id,
        _memory_num: this.globalData.db_m_n
      },
      success(res) {
        console.log("修改成功", res)
      },
      fail(res) {
        console.log("修改失败", res)
      }
    })

  },

  
  //修改单词库6级的记忆指数
  updData6() {
    wx.cloud.callFunction({
      name: "upd_6",
      data: {
        _id: this.globalData.db_id,
        _memory_num: this.globalData.db_m_n,
        _userx: this.globalData.db_userx

      },
      success(res) {
        console.log("修改成功", res)
      },
      fail(res) {
        console.log("修改失败", res)
      }
    })

  },

  //修改单词库gaokao的记忆指数
  updDatagaokao() {
    wx.cloud.callFunction({
      name: "upd_gaokao",
      data: {
        _id: this.globalData.db_id,
        _memory_num: this.globalData.db_m_n,
        _userx: this.globalData.db_userx

      },
      success(res) {
        console.log("修改成功", res)
      },
      fail(res) {
        console.log("修改失败", res)
      }
    })

  },

  //修改单词库gre的记忆指数
  updDatagre() {
    wx.cloud.callFunction({
      name: "upd_gre",
      data: {
        _id: this.globalData.db_id,
        _memory_num: this.globalData.db_m_n,
        _userx: this.globalData.db_userx

      },
      success(res) {
        console.log("修改成功", res)
      },
      fail(res) {
        console.log("修改失败", res)
      }
    })

  },

  //修改单词库toefl的记忆指数
  updDatatoefl() {
    wx.cloud.callFunction({
      name: "upd_toefl",
      data: {
        _id: this.globalData.db_id,
        _memory_num: this.globalData.db_m_n,
        _userx: this.globalData.db_userx

      },
      success(res) {
        console.log("修改成功", res)
      },
      fail(res) {
        console.log("修改失败", res)
      }
    })

  },

  //*********************云拉取单词****************************
  //云拉取单词库6
  getword6() {
    var that = this
    wx.cloud.callFunction({
      name: "getword_6",
      data: {
        _userx: this.globalData.db_userx

      },
      success: res => {
        console.log("云获取成功", res)
        that.globalData.overallWordList = res.result.data
        console.log("yes", that.globalData.overallWordList)
      },
      fail(res) {
        console.log("获取失败", res)
      }
    })
  },

  //云拉取单词库gre
  getwordgre() {
    var that = this
    wx.cloud.callFunction({
      name: "getword_gre",
      data: {
        _userx: this.globalData.db_userx

      },
      success: res => {
        console.log("云获取成功", res)
        that.globalData.overallWordList = res.result.data
        console.log("yes", that.globalData.overallWordList)
      },
      fail(res) {
        console.log("获取失败", res)
      }
    })
  },

  //云拉取单词库gaokao
  getwordgaokao() {
    var that = this
    wx.cloud.callFunction({
      name: "getword_gaokao",
      data: {
        _userx: this.globalData.db_userx

      },
      success: res => {
        console.log("云获取成功", res)
        that.globalData.overallWordList = res.result.data
        console.log("yes", that.globalData.overallWordList)
      },
      fail(res) {
        console.log("获取失败", res)
      }
    })
  },

  //云拉取单词库toefl
  getwordtoefl() {
    var that = this
    wx.cloud.callFunction({
      name: "getword_toefl",
      data: {
        _userx: this.globalData.db_userx

      },
      success: res => {
        console.log("云获取成功", res)
        that.globalData.overallWordList = res.result.data
        console.log("yes", that.globalData.overallWordList)
      },
      fail(res) {
        console.log("获取失败", res)
      }
    })
  },




  //云拉取单词
  yun(){
    var that = this 
    wx.cloud.callFunction({
      name:"get_finished1",
      success: res => {
        console.log("云获取成功",res)
          that.globalData.overallWordList = res.result.data
          console.log("yes",that.globalData.overallWordList)
          
        },
        fail(res) {
          console.log("获取失败wuwuwu", res)
        }
    })
  },
 //*******************************拉取用户背过的单词*********************************
  //拉背过的六级单词
  yun1(){
    var that = this 
    wx.cloud.callFunction({
      name:"get_finished1",
      data: {
        _word : k
      },
      success: res => {
        console.log("云获取成功1",res)
          that.globalData.overallWordList = res.result.data
          console.log("yes",that.globalData.overallWordList)
          
        },
        fail(res) {
          console.log("获取失败1", res)
        }
    })
  },

  //拉背过的高考单词
  yun2(){
    var that = this 
    wx.cloud.callFunction({
      name:"get_finished2",
      data: {
        _word : k
      },
      success: res => {
        console.log("云获取成功2",res)
          that.globalData.overallWordList = res.result.data
          console.log("yes",that.globalData.overallWordList)
          
        },
        fail(res) {
          console.log("获取失败2", res)
        }
    })
  },

  //拉背过的gre单词
  yun3(){
    var that = this 
    wx.cloud.callFunction({
      name:"get_finished3",
      data: {
        _word : k
      },
      success: res => {
        console.log("云获取成功3",res)
          that.globalData.overallWordList = res.result.data
          console.log("yes",that.globalData.overallWordList)
          
        },
        fail(res) {
          console.log("获取失败3", res)
        }
    })
  },

  //拉背过的托福单词
  yun4(k){
    var that = this 
    wx.cloud.callFunction({
      name:"get_finished4",
      data: {
        _word : k
      },
      success: res => {
        console.log("云获取成功4",res)
          that.globalData.overallWordList = res.result.data
          console.log("yes",that.globalData.overallWordList)
          
        },
        fail(res) {
          console.log("获取失败4", res)
        }
    })
  },
  

  //*******************************用户信息库操作函数*********************************
  //更新用户背诵记录
  updUsersmry() {
    wx.cloud.callFunction({
      name: "Users_Mry",
      data: {
        _openid: this.globalData.db_userx,
        _word: this.globalData.db_word,
        _memory_num: this.globalData.db_m_n,
        _dic: this.globalData.rememberNow
      },
      success(res) {
        console.log("更新用户成功")
      },
      fail(res) {
        console.log("更新用户失败")
      }
    })
  },

  //增加users的背诵时间
  Time_Inc() {
    wx.cloud.callFunction({
      name: "time_inc",
      data: {
        _id: this.globalData.db_userx,
        _inc_time: this.globalData.db_inc_time
      },
      success(res) {
        console.log("自增成功", res)
      },
      fail(res) {
        console.log("自增失败", res)
      }
    })

  },

  //增加该用户
  addUsers() {
    console.log("调用成功")
    wx.cloud.callFunction({
      name: "AddUsers",
      data: {
        _userx: this.globalData.db_userx
      },
      success(res) {
        console.log("添加用户成功", res)
      },
      fail(res) {
        console.log("添加用户失败", res)
      }
    })
  },

  //表中是否存在用户
  IfUsers() {
    let that = this;
    wx.cloud.callFunction({
      name: "UsersFile",
      data: {
        _userx: this.globalData.db_userx
      },
      success(res) {
        console.log(res)
        that.globalData.wordfetch = res.result.data
        console.log(that.globalData.wordfetch)
        //console.log(res.result.data.length)
        if (res.result.data.length == 0) {
          console.log("用户不存在")
          that.addUsers()
        }
        else {
          console.log("用户已存在")
        }

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
      var app = getApp()
      var list = app.globalData.overallWordList;
      var timer = setInterval(function () {
        console.log("循环定时器等待循环请求结束")

        if (app.globalData.overallWordList != undefined) {

          console.log(list)

          console.log('333')
          clearInterval(timer);
        }
      }, 500)
      console.log('**************');
      console.log(list);
      for(var i=0;i<list.length;++i){
       if (list[i].isSelected==1) list[i].memory_num=100;
      }
      //记忆指数加权计算
      var p1,p2,p3,p4,p5 //分别对应同下标权值的分值
      
      for (var i = 0; i < list.length; ++i) {
        if (list[i].memory_num <= 100 && list[i].memory_num >= 0){
          if (list[i].isSelected == 0) {
            p1 = 100 * (Math.exp(-list[i].numclick) - 0.5)

            if (list[i].theDifficultyByUser == 0) p2 = 20
            if (list[i].theDifficultyByUser == 1) p2 = 0
            if (list[i].theDifficultyByUser == 2) p2 = -20

            if (list[i].numOfWrongClick == 1) p3 = 30
            if (list[i].numOfWrongClick == 2) p3 = 10
            if (list[i].numOfWrongClick == 3) p3 = -10
            if (list[i].numOfWrongClick == 4) p3 = -30

            p4 = 100 * (Math.exp(list[i].learnTime) - 0.5)
            p5 = 100 * (Math.exp(list[i].testTime) - 0.5)

            list[i].memory_num += k1 * p1 + k2 * p2 + k3 * p3 + k4 * p4 + k5 * p5
            //边值确定
            if (list[i].memory_num > 100) list[i].memory_num = 100
            if (list[i].memory_num < 0) list[i].memory_num = 0
          
          console.log(i, p4, list[i].learnTime, p5, list[i].timeOnTest)
                    
          console.log(i, list[i].memory_num)
          console.log('修改赋值')
        }}
        else{
            if (list[i].isSelected == 0) {
              p1 = 100 * Math.exp(-list[i].numclick / 5)

              if (list[i].theDifficultyByUser == 0) p2 = 70
              if (list[i].theDifficultyByUser == 1) p2 = 30
              if (list[i].theDifficultyByUser == 2) p2 = 0

              if (list[i].numOfWrongClick == 0) p3 = 80
              if (list[i].numOfWrongClick == 1) p3 = 50
              if (list[i].numOfWrongClick == 2) p3 = 20
              if (list[i].numOfWrongClick == 3) p3 = 0

              p4 = 100 * Math.exp(-list[i].learnTime / 10)
              p5 = 100 * Math.exp(-list[i].timeOnTest / 10)

              console.log(i, p4, list[i].learnTime, p5, list[i].timeOnTest)

              list[i].memory_num = k1 * p1 + k2 * p2 + k3 * p3 + k4 * p4 + k5 * p5
              console.log(i, list[i].memory_num)
              console.log('初次赋值')
        }}
      }
      
      console.log(list);
      console.log('运行完成');
    },
    //记忆指数修正函数
    recalc_memory_num: function (k1, k2, k3, k4, k5) {
      var app = getApp()
      var list = app.globalData.overallWordList;
      console.log('**************');
      console.log(list);
      for (var i = 0; i < list.length; ++i) {
        if (list[i].isSelected === 1) list[i].memory_num = 100;
      }
      console.log(list);
      console.log('**************');
      //记忆指数加权计算
      var p1, p2, p3, p4, p5 //分别对应同下标权值的修正
      for (var i = 0; i < list.length; ++i) {
        p1 = 100 * (Math.exp(-list[i].numclick)-0.5)

        if (list[i].theDifficultyByUser== 0) p2 = 20
        if (list[i].theDifficultyByUser == 1) p2 = 0
        if (list[i].theDifficultyByUser == 2) p2 = -20

        if (list[i].numOfWrongClick == 1) p3 = 30
        if (list[i].numOfWrongClick == 2) p3 = 10
        if (list[i].numOfWrongClick == 3) p3 = -10
        if (list[i].numOfWrongClick == 4) p3 = -30

        p4 = 100 * (Math.exp(list[i].learnTime) - 0.5)
        p5 = 100 * (Math.exp(list[i].testTime) - 0.5)

        list[i].memory_num += k1 * p1 + k2 * p2 + k3 * p3 + k4 * p4 + k5 * p5
        //边值确定
        if (list[i].memory_num > 100) list[i].memory_num = 100
        if (list[i].memory_num < 0) list[i].memory_num = 0
    }
  },
  //遗忘函数(以天为单位)
  forgettingCurve:function(){
    var app = getApp()
    var list = app.globalData.overallWordList;
    for (var i = 0; i < list.length; ++i) {
      if (list[i].memory_num < 90 && list[i].memory_num >= 60) list[i].memory_num *= 0.6
      if (list[i].memory_num < 60 && list[i].memory_num >= 30) list[i].memory_num *= 0.4
      if (list[i].memory_num < 30 && list[i].memory_num >= 0) list[i].memory_num *= 0.2
    }
  },
  getTimeforUse(timestamp) {

    var date = new Date(timestamp);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时
    var h = date.getHours();
    //分
    var m = date.getMinutes();
    //秒
    var s = date.getSeconds();
    var Millisecond = Math.floor(date.getMilliseconds() / 10);
    console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s + Millisecond);
  
    return ( m*60 + s);
  }
  
 
})