// pages/infoget/infoget.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain:false,
    loading: false
  },

  getlist() {
    var app = getApp() 
    let that = this

    wx.cloud.database().collection("list").get({

      success(res) {
        console.log("获取成功", res)

          app.overallWordList = res.data

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

  },
  storeindatabase:function(){
    
  },
  inputChangeHandle:function(e){
    console.log(e)
  },
  addTodoHandle: function () {
    console.log('333')
  },
  jumptowordlist:function(){
    this.getlist(),
    wx.redirectTo({
      url: '../selectwords/selectwords'
      
    })
    console.log(456)
  }
})