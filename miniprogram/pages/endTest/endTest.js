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
    wx.redirectTo({
      url: '../infomationGet/infomationGet',
    })
  },
  calculateMem:function(){
    //放入记忆指数计算
  },


onLoad: function () {
    app.globalData.flagForIndentify= app.globalData.flagForIndentify+1
    console.log("第二次进入",app.globalData.flagForIndentify)
    if(app.globalData.flagForIndentify==1){
      app.yun();
      
      var timer = setInterval(function () {
        console.log("循环定时器等待循环请求结束")
       
      if (app.globalData.overallWordList[0]._id !=undefined ) {
     
          console.log('轮询已完成')
          clearInterval(timer);
        }
      }, 500)
    }

    if(app.globalData.flagForIndentify==2){
      var timestamp = Date.parse(new Date());
      console.log("当前时间戳为：" + timestamp);
      var timeResult = app.getTimeforUse(timestamp);
      app.globalData.timeEnd = timeResult
      console.log("timeEnd", app.globalData.timeEnd)
      console.log("timebegin", app.globalData.timeBegin)
      var b = ((app.globalData.timeEnd - app.globalData.timeBegin) > 60) ? 60 : (app.globalData.timeEnd -app.globalData.timeBegin)
      console.log("b", b)
      app.globalData.timeBegin = timeResult

     
      app.globalData.totalLearnTime = app.globalData.totalLearnTime +b
    
    }
    this.setData({
      word: app.globalData.flagForIndentify
    })
}
})