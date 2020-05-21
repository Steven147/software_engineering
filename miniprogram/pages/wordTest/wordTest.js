var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    word: {},
    timeBegin :"",
    timeEnd:"",
    id:1,
    ap:Math.floor(Math.random() * 2400)+1
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
    if (idm < app.globalData.overallWordList.length) {
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
        id: idm + 1,
        ap:Math.floor(Math.random() * 2400) + 1,
    })
    }
    
    if (idm==app.globalData.overallWordList.length) {
      console.log("bushuchu")
      
      var timestamp = Date.parse(new Date());

      console.log("此时时间戳为：" + timestamp);
      var timeResult = that.getTimeforUse(timestamp);
      that.setData({
        timeEnd: timeResult
      })
      
      var b = that.data.timeEnd - that.data.timeBegin;
      
      that.data.word.forEach(function (item, index) {
        if (index == e.currentTarget.dataset.index) {
          var timeOnTest = "word[" + index + "].timeOnTest";
          that.setData({
            [timeOnTest]: b
          })
        }
      })
      app.globalData.overallWordList = that.data.word;
      console.log(app.globalData.overallWordList)
      app.calc_memory_num(0.2,0.3,0.1,0.1,0.3)
      wx.navigateTo({
          url: '../endTest/endTest',
        })
      
    } 

  },
  
    // for (var i = 0, len = app.globalData.overallWordList.length; i < len ; i++) {
      // this.arr[i] = i
  // }
      // var len = this.arr.length;
      // for(var i=0;i<len;i++) {
      // var index = Math.floor(Math.random()*(len-i));
      // var tem = this.arr[index];
      // this.arr[index] = this.arr[len-i-1];
      // this.arr[len-i-1] = tem;}
        // console.log(this.arr);//乱序函数

    // for (var i = 0, len = app.globalData.overallWordList.length; i < len ; i++) {
      // this.data.newid[i]=this.arr[i]
    //  }
    //  console.log(this.data.newid);

  // },
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

   //修复_id不连续导致的显示问题 
    var nw=1
    var num=app.globalData.overallWordList.length
    if (that.data.word[0].newid == undefined) {
      that.data.word.forEach(function(item, index) {
        var newid = "word[" + index + "].newid";
        that.setData({
          [newid]: nw
        }) 
        nw=nw+1
        num=num-1
      })}
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
     
      //this.data.timeBegin = function formatTime(time) {
      //  return moment.unix(time).format('YYYY/MM/DD HH:mm:ss:SSS')
      //}
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