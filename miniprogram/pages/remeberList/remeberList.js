// pages/word1/word1.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: {},
    isSelectedList:[],
    
  },
  goWord() {
    this.addPropertyInList(this.data.word, this.data.isSelected,this.data.isSelectedList)
    console.log(2);
    wx.navigateTo({
      url: '../wordShow/wordShow',
    
    })
  },
  checkIsSelected(e) {
    this.setData({
      isSelectedList : e.detail.value
    })
    
  },

  onLoad: function (options) {
    setInterval
    this.setData({
      word: app.globalData.overallWordList,

    })
   
  },

  addPropertyInList(a, b,c) {
    var word = a
    var isSelected=b
    var isSelectedValue=c
    var that = this
    this.setData({
      word: app.globalData.overallWordList,

    })
    that.data.word.forEach(function (item, index) {
     
        var isSelected = "word[" + index + "].isSelected";

        that.setData({
          [isSelected]: 0
        })
    })
    for (let value of this.data.isSelectedList) {
    
      that.data.word.forEach(function (item, index) {
        if (value === item._id) {
          var isSelected = "word[" + index + "].isSelected";

          that.setData({
            [isSelected]: 1
          })
        }
        
      })

    }

    
      app.globalData.overallWordList = that.data.word
     console.log(app.globalData.overallWordList)
  },


})