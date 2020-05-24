// pages/message/message.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  word:{},
  souword:'a'
  },
  //搜索框中只能输入字母
  inputLetter: function(e) {
    var pwd = e.detail.value
    return pwd.replace(/[^a-zA-Z]/g,'')
},
  sou: function () {
    this.setData({
      souword:'abandon'
    })
    console.log("单词"+this.data.word)
},
addPropertyInList(a) {

  var word = a
  var that = this

  that.data.word.forEach(function (item, index) {
      app.globalData.overallWordList = that.data.word
  })

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      word: app.globalData.overallWordList,
    })
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