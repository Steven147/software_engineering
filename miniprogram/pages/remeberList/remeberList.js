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
    this.addPropertyInList(this.data.word,this.data.isSelectedList)
    console.log(2);
    wx.navigateTo({
      url: '../wordShow/wordShow',
    
    })
    console.log(app.globalData.overallWordList)
  },
  checkIsSelected(e) {
    this.setData({
      isSelectedList : e.detail.value
    })
    
  },

  onLoad: function (options) {
    for(var i=0;i<app.globalData.overallWordList.length;i++){
      app.globalData.overallWordList[i].learnTime=0;
      app.globalData.overallWordList[i]._id=i;
    }
   
    this.setData({
      word: app.globalData.overallWordList,

    })
    
   
  },

  addPropertyInList(a, c) {
    var word = a
    var isSelectedValue=c
    var that = this
    
    that.data.word.forEach(function (item, index) {
     
      app.globalData.overallWordList[index].isSelected=0
    })
    console.log(that.data.isSelectedList)
    for (let value of isSelectedValue) {
    
      that.data.word.forEach(function (item, index) {
        if (value == item._id) {
          app.globalData.overallWordList[index].isSelected=1
        }
        
      })

    }

    
      
    
  },


})