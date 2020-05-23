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
  choiceBook1: function () {
    app.getwordgaokao();
    app.globalData.rememberList.push("gaokao")
    app.globalData.rememberNow="gaokao"
    console.log(app.globalData.rememberList)
  },
  choiceBook2: function () {
      app.getword6();
    
      app.globalData.rememberList.push("cet6")
      app.globalData.rememberNow="cet6"
      console.log(app.globalData.rememberList)
  },
  choiceBook3: function () {
    app.getwordgre();
    
    app.globalData.rememberList.push("gre")
    app.globalData.rememberNow="gre"
    console.log(app.globalData.rememberList)
  },
  choiceBook4: function () {
    app.getwordtoefl();
    
    app.globalData.rememberList.push("toefl")
    app.globalData.rememberNow="toefl"
    console.log(app.globalData.rememberList)
  },
  jumptowordlist: function () {

    app.globalData.overallWordList= app.globalData.overallWordList.splice(0,this.data.numOfPlan)
    
    wx.redirectTo({
      url: '../remeberList/remeberList'

    })
    
  },

})