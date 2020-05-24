// pages/message/message.js
var app =getApp()
//query_word
var myword=""

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
    myword=e.detail.value
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

  onQuery: function () {
    let that = this
    wx.cloud.callFunction({
      name: "query",
      data: {
        _word: myword
      },
      success: res => {
        that.setData({
          queryResult: res.result.data
        })
        console.log("yes", that.data.queryResult)

      },
      fail(res) {
        console.log("获取失败", res)
      }
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