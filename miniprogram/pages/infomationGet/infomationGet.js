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
    
    console.log(1)
  },
  choiceBook2: function () {
      app.getword6();
    
    console.log(2)
  },
  choiceBook3: function () {
    app.getwordgre();
    
    console.log(3)
  },
  choiceBook4: function () {
    app.getwordtoefl();
    
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