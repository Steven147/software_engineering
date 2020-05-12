// pages/infoget/infoget.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    numOfPlan:50
  },

  onLoad: function (options) {
    app.yun()
  },
  onReady: function (options) {
   
  },
  
  
  
  inputChangeHandle: function (e) {
    this.setData({
     numOfPlan:e.detail.value
    })
   
  },

  addTodoHandle: function (e) {
    var that=this
    that.setData({
      munOfPlan:e.detail.value
     })
    app.yun();
    var timer = setInterval(function () {
      console.log("循环定时器等待循环请求结束")
     
      if (app.globalData.overallWordList !=undefined ) {
      
        
       
        console.log(app.globalData.overallWordList)

        console.log('轮询已完成')
        clearInterval(timer);
      }
    }, 500)
    
    
    
    
    
    

  },
  choiceBook1: function () {

    
    console.log(1)
  },
  choiceBook2: function () {

    
    console.log(2)
  },
  choiceBook3: function () {

    
    console.log(3)
  },
  choiceBook4: function () {

    
    console.log(4)
  },
  jumptowordlist: function () {

    app.globalData.overallWordList= app.globalData.overallWordList.splice(0,this.data.numOfPlan)
    wx.redirectTo({
      url: '../remeberList/remeberList'

    })
    console.log(456)
  },

})