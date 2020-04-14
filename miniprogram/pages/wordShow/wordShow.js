var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: {},
    numclick: ''
  },
  goTest0() {
    app.calc_memory_num();
    console.log(0);
    wx.navigateTo({
      url: '../wordTest/wordTest',
    })
  },
  goTest1() {
    app.calc_memory_num();
    console.log(1);
    wx.navigateTo({
      url: '../ wordTest / wordTest',
    })
  },
  goTest2() {
    app.calc_memory_num();
    console.log(2);
    wx.navigateTo({
      url: '../wordTest/wordTest',
    })
  },

  sound(e) {
    console.log(3);
    var index = e.currentTarget.dataset.index;
    ++this.data.word[index].numclick;
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
          [numclick]: 0
        })

        app.globalData.overallWordList = that.data.word
      })
    console.log(app.globalData.overallWordList)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      word: app.globalData.overallWordList,
    }),
      this.addPropertyInList(this.data.word, this.data.numclick)
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