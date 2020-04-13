// pages/word1/word1.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: {},
    click:{},
    numclick:''
  },
  goWord() {
    console.log(2);
    wx.navigateTo({
      url: '../wordShow/wordShow',
    })
  },
  sound() {
    console.log(1);
  },

  onLoad: function (options) {
    this.setData({
      word: app.globalData.overallWordList,

    }),
    this.addPropertyInList(this.data.word, this.data.numclick)
  },
  addPropertyInList(a, b) {
    var word = a
    var numclick = b
    var that = this
    this.setData({
      word: app.globalData.overallWordList,

    }),

      that.data.word.forEach(function (item, index) {

        var numclick = "word[" + index + "].numclick";
        that.setData({
          [numclick]: 18
        })

        app.globalData.overallWordList = that.data.word
      })
    console.log(app.globalData.overallWordList)
  },


})