// pages/infoget/infoget.js

var app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    isSelected:0,
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    numOfPlan:50
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
    
   
  },
  preCalculate(){
   //如果要用计划数：用 this.data.numOfPlan
   var timer = setInterval(function () {
     console.log("循环定时器等待排序")
     wx.showLoading({

      title: '数据加载中。。。',
      
      });
     if (app.globalData.orderFinished ==true ) {
      clearInterval(timer);
      
    }
   }, 500)
   this.setData({
     isSelected:5
   })
   
  },
  choiceBook1: function () {
    this.setData({
      isSelected:1
    })
    app.getwordgaokao();
    app.globalData.rememberList.push("gaokao")
    app.globalData.rememberNow="gaokao"
    console.log(this.data.isSelected)
  },
  choiceBook2: function () {
      app.getword6();
      this.setData({
        isSelected:2
      })
      app.globalData.rememberList.push("cet6")
      app.globalData.rememberNow="cet6"
      console.log(this.data.isSelected)
  },
  choiceBook3: function () {
    app.getwordgre();
    this.setData({
      isSelected:3
    })
    app.globalData.rememberList.push("gre")
    app.globalData.rememberNow="gre"
    console.log(this.data.isSelected)
  },
  choiceBook4: function () {
    app.getwordtoefl();
    this.setData({
      isSelected:4
    })
    app.globalData.rememberList.push("toefl")
    app.globalData.rememberNow="toefl"
    console.log(this.data.isSelected)
  },
  jumptowordlist: function () {

    app.globalData.overallWordList= app.globalData.overallWordList.splice(0,this.data.numOfPlan)
    
    wx.redirectTo({
      url: '../remeberList/remeberList'

    })
    
  },

})