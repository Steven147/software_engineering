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
    nee: []
  },

  onLoad: function (options) {
    app.getlist()
  },
  onReady: function (options) {
   
  },
  
  
  
  inputChangeHandle: function (e) {
    

  },

  addTodoHandle: function () {
    var that=this
   
    app.getlist();
    var timer = setInterval(function () {
      console.log("循环定时器等待循环请求结束")
     
      if (app.globalData.overallWordList !=undefined ) {
      
        
        that.setData({
          nee: app.globalData.overallWordList

        })
        console.log(app.globalData.overallWordList)

        console.log('333')
        clearInterval(timer);
      }
    }, 500)
    
    
    
    
    
    

  },

  jumptowordlist: function () {


    wx.redirectTo({
      url: '../remeberList/remeberList'

    })
    console.log(456)
  },

})