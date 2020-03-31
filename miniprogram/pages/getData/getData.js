// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"<h1>hello world</h1>",
    //单词表
    overallWordList: [
      { content: 'a', index: 0, countNum: 0 },
      { content: 'about', index: 1, countNum: 0 },
      { content: 'as', index: 2, countNum: 0 },
      { content: 'also', index: 3, countNum: 0 },
      { content: 'and', index: 4, countNum: 0 },
      { content: 'because', index: 5, countNum: 0 },
      { content: 'could', index: 6, countNum: 0 }
    ],
  },
  countNum0(){
    var that = this;
    that.data.overallWordList[0].countNum += 1
    this.setData({overallWordList: that.data.overallWordList})
  },
  countNum1() {
    var that = this;
    that.data.overallWordList[1].countNum += 1
    this.setData({ overallWordList: that.data.overallWordList })
  },
  countNum2() {
    var that = this;
    that.data.overallWordList[2].countNum += 1
    this.setData({ overallWordList: that.data.overallWordList })
  },
  countNum3() {
    var that = this;
    that.data.overallWordList[3].countNum += 1
    this.setData({ overallWordList: that.data.overallWordList })
  },
  countNum4() {
    var that = this;
    that.data.overallWordList[4].countNum += 1
    this.setData({ overallWordList: that.data.overallWordList })
  },
  countNum5() {
    var that = this;
    that.data.overallWordList[5].countNum += 1
    this.setData({ overallWordList: that.data.overallWordList })
  },
  countNum6() {
    var that = this;
    that.data.overallWordList[6].countNum += 1
    this.setData({ overallWordList: that.data.overallWordList })
  },
  clear(){  
    for (var i = 0;i < this.data.overallWordList.length;i++){
    this.data.overallWordList[i].countNum = 0
    this.setData({ overallWordList: this.data.overallWordList })
    }
  },
  goIndex() {
    wx.navigateTo({
      url: '../word3/word3',
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

  }
})