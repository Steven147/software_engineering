var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: {},
    
    timeBegin :"",
    timeEnd:"",
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

  true(e){
    var that=this;
    var idm=that.data.id;
    if (idm < 20) {
      console.log(that.data.id);
      var timestamp = Date.parse(new Date());
     
      console.log("此时时间戳为：" + timestamp);
      var timeResult = that.getTimeforUse(timestamp);
      that.setData({
        timeEnd: timeResult
      })
      //that.data.timeEnd = function formatTime(time) {
      //  return moment.unix(time).format('YYYY/MM/DD HH:mm:ss:SSS')
      //}
      var b = that.data.timeEnd-this.data.timeBegin;
      console.log(
        "e", e.currentTarget.dataset.index,"b",b)
      that.data.word.forEach(function (item, index) {
        if(index==e.currentTarget.dataset.index){
          var timeOnTest = "word[" + index + "].timeOnTest";
          that.setData({
            [timeOnTest]: b
          })
        }
        

       
      })
      that.setData({
        timeBegin: that.data.timeEnd
      })
    
      
      
      console.log(
        "时间是", app.globalData.overallWordList)
      console.log(
        "时刻是", app.globalData.overallWordList)
      that.setData({
        id: idm + 1
      })
      
    }
    
    else {
      
      var timestamp = Date.parse(new Date());

      console.log("此时时间戳为：" + timestamp);
      var timeResult = that.getTimeforUse(timestamp);
      that.setData({
        timeEnd: timeResult
      })
      
      var b = that.data.timeEnd - this.data.timeBegin;
      
      that.data.word.forEach(function (item, index) {
        if (index == e.currentTarget.dataset.index) {
          var timeOnTest = "word[" + index + "].timeOnTest";
          that.setData({
            [timeOnTest]: b
          })
        }
      })
      app.globalData.overallWordList = this.data.word;
      console.log(app.globalData.overallWordList)
      app.recalc_memory_num(0.1,0.1,0.1,0.1,0.6);
      wx.navigateTo({
          url: '../wordTest/tstend',
        })
      console.log(app.globalData.overallWordList)
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
      timestamp = timestamp;
      console.log("当前时间戳为：" + timestamp);
      var timeResult = this.getTimeforUse(timestamp);
      this.setData({
        timeBegin: timeResult
      })
    
    } 
    this.setData({
      word: app.globalData.overallWordList,
    }),
      this.addPropertyInList(this.data.word, this.data.numOfWrongClick)
  },
  getTimeforUse( timestamp){
   
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