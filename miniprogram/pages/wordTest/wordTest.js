var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: {},
    

    id:1
  },
  
  

  wrong(e) {
    
    console.log(this.data.word[e.currentTarget.dataset.index].numOfWrongClick)
    
    var a= this.data.word[e.currentTarget.dataset.index];
    a.numOfWrongClick = a.numOfWrongClick+1;
    
    this.setData({
      [this.data.word[e.currentTarget.dataset.index].numOfWrongClick]: a
    })

   
  },

  true(){
    var idm=this.data.id;
    if (idm<20) {
      console.log(this.data.id);
      this.setData({
          id:idm+1
        })
    } else {
      app.globalData.overallWordList = this.data.word
      wx.navigateTo({
        url: '../wordTest/tstend',
      })
    }

  },
  
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      word: app.globalData.overallWordList,
    }),
      this.addPropertyInList(this.data.word, this.data.numOfWrongClick)
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