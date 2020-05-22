// pages/endTest/endTest.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:[]
  },
  gotoImformationGet(){
      wx.navigateTo({
        url: '../infomationGet/infomationGet',
      })
  },
  gotowordShow(){
    wx.navigateTo({
      url: '../infomationGet/infomationGet',
    })
  },
  calculateMem:function(){
    //放入记忆指数计算
  },


onLoad: function () {
    
    if(app.globalData.overallWordList[0]._id ==undefined){
      app.yun();
    }
    var timer = setInterval(function () {
      console.log("循环定时器等待循环请求结束")
     
    if (app.globalData.overallWordList[0]._id !=undefined ) {
   
        console.log('轮询已完成')
        clearInterval(timer);
      }
    }, 500)
    this.setData({
      word: app.globalData.overallWordList,
    })
}
})