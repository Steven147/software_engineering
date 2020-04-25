var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: {},
    numclick: '',
    //copylist: {},
    id: 1,
  },

  //setcopylist(a, b) {
  //var word = a;
  //var copylist = b;
  // this.setData({
  //   word: app.globalData.overallWordList,

  // });
  // var j = 0;
  // for (let i = 0; i < 20; ++i) {
  //  if (this.data.word[i].isSelected == 0) {
  //    copylist[j] = this.data.word[i]._id;
  //    ++j;
  //   }
  //  };
  // console.log(copylist);
  //},

  goindex() {
    wx.navigateTo({
      url: '../wordTest/wordTest',
    })
  },
  goTest0(e) {
    var index = e.currentTarget.dataset.index;
    var theDifficultyByUser = 'word[' + index + '].theDifficultyByUser';
    this.setData({
      [theDifficultyByUser]: 0
    })
    var idm = this.data.id;
    if (idm < 20) {
      console.log(this.data.id);
      this.setData({
        id: idm + 1
      })
    } else {
      wx.navigateTo({
        url: '../wordTest/wordTest',
      })
    }
  },

  goTest1(e) {
    var index = e.currentTarget.dataset.index;
    var theDifficultyByUser = 'word[' + index + '].theDifficultyByUser';
    this.setData({
      [theDifficultyByUser]: 1
    })
    var idm = this.data.id;
    if (idm < 20) {
      console.log(this.data.id);
      this.setData({
        id: idm + 1
      })
    } else {
      wx.navigateTo({
        url: '../wordTest/wordTest',
      })
    }
  },
  goTest2(e) {
    var index = e.currentTarget.dataset.index;
    var theDifficultyByUser = 'word[' + index + '].theDifficultyByUser';
    this.setData({
      [theDifficultyByUser]: 2
    })
    var idm = this.data.id;
    if (idm < 20) {
      console.log(this.data.id);
      this.setData({
        id: idm + 1
      })
    } else {
      wx.navigateTo({
        url: '../wordTest/wordTest',
      })
    }
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

      that.data.word.forEach(function(item, index) {

        var numclick = "word[" + index + "].numclick";
        that.setData({
          [numclick]: 0
        })

        app.globalData.overallWordList = that.data.word
      })
    that.data.word.forEach(function(item, index) {

      var theDifficultyByUser = "word[" + index + "].theDifficultyByUser";
      that.setData({
        [theDifficultyByUser]: -1
      })

      app.globalData.overallWordList = that.data.word
    })
    that.data.word.forEach(function(item, index) {

      var id2 = "word[" + index + "].id2";
      that.setData({
        [id2]: -1
      })
      for (let i = 0, j = 1; i < 20; ++i) {
        if (that.data.word[i].isSelected == 0) {
          var id2 = "word[" + i + "].id2";
          that.setData({
              [id2]: j
            })
            ++j;
        }
      };

      app.globalData.overallWordList = that.data.word
    })
    console.log(app.globalData.overallWordList)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
        word: app.globalData.overallWordList,
      }),
      this.addPropertyInList(this.data.word, this.data.numclick)
    this.addPropertyInList(this.data.word, this.data.theDifficultyByUser)
    this.addPropertyInList(this.data.word, this.data.id2)
    //this.setcopylist(this.data.word, this.data.copylist)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})