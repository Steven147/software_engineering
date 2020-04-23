var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: {},
    

    id:1
  },
  
  

  wrong(e) {
    
    console.log(this.data.word[e.currentTarget.dataset.index].numOfWrongClick)
    
    var a= this.data.word[e.currentTarget.dataset.index];
    a.numOfWrongClick = a.numOfWrongClick+1;
    
    this.setData({
      [this.data.word[e.currentTarget.dataset.index].numOfWrongClick]: a
    })

   
  },

  true(){
    var idm=this.data.id;
    if (idm<20) {
      console.log(this.data.id);
      this.setData({
          id:idm+1
        })
    } else {
      app.globalData.overallWordList = this.data.word
      var idm = this.data.id;
      if (idm == 20) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("此时时间戳为：" + timestamp);
        var timeResult = this.getTimeforUse(timestamp);
        app.globalData.timeEnd= timeResult;

      } 
      app.globalData.timeOnTest = app.globalData.timeEnd - app.globalData.timeBegin;
      console.log("时间是", app.globalData.timeOnTest, app.globalData.timeEnd, app.globalData.timeBegin)
      wx.navigateTo({
        url: '../wordTest/tstend',
      })
    }

  },
  
  addPropertyInList(a, b) {
    var word = a
    
    var that = this
    that.data.word.forEach(function (item, index) {

      var numOfWrongClick = "word[" + index + "].numOfWrongClick";
        that.setData({
          [numOfWrongClick]: 0
        })

        app.globalData.overallWordList = that.data.word
    })
    console.log(that.data.word[1].numOfWrongClick)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var idm = this.data.id;
    if (idm == 1) {
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      console.log("当前时间戳为：" + timestamp);
      var timeResult = this.getTimeforUse(timestamp);
      app.globalData.timeBegin = timeResult;

    } 
    this.setData({
      word: app.globalData.overallWordList,
    }),
      this.addPropertyInList(this.data.word, this.data.numOfWrongClick)
  },
  getTimeforUse( timestamp){
    var n = timestamp * 1000;
    var date = new Date(n);
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
    console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);
    return (m*60+s);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})