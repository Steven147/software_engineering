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
    numOfPlan:''
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

  addTodoHandle: function () {
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

  jumptowordlist: function () {

    app.globalData.overallWordList= app.globalData.overallWordList.splice(0,this.data.numOfPlan)
    wx.redirectTo({
      url: '../remeberList/remeberList'

    })
    console.log(456)
  },

})