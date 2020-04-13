// pages/infoget/infoget.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    nee: []
  },

  onLoad: function (options) {
    this.getlist()
  },
  onReady: function (options) {
    this.getlist()
  },

  getlist() {
    let that = this
    wx.cloud.database().collection("list").get({
      success: res => {
        console.log("获取成功", res)
        app.globalData.overallWordList = res.data
        app.globalData.localWordList=res.data
      },
      fail(res) {
        console.log("获取失败", res)
      }
    })

  },
  inputChangeHandle: function (e) {
    

  },

  addTodoHandle: function () {
   
    this.setData({
      nee: app.globalData.overallWordList
    })
    console.log(app.globalData.overallWordList)
    console.log(app.globalData.localWordList)
    console.log('333')


  },
  jumptowordlist: function () {


    wx.redirectTo({
      url: '../remeberList/remeberList'

    })
    console.log(456)
  },

})