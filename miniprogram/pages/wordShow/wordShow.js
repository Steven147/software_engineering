//setdata使用数据通道消耗资源，为避免对不在ml文件中显示的数据不断设置，将本地属性word中仅存放id2,其余存在在data以外的变量wordOutData中
var app = getApp()
var startX, endX;
var moveFlag = true;

const innerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  timeBegin: "",
  timeEnd: "",
  data: {
    word: {},
    id: 1,
    ani: '',
    list: ['太简单', '下一个', '仍需记忆']
  },

  click: function(e) {
    var index = e.currentTarget.dataset.index;
    app.globalData.overallWordList[index].theDifficultyByUser = index;
    this.setData({
      selectedindex: index
    });
  },


  timecalculate: function(e) {
    var that = this
    var timestamp = Date.parse(new Date());

    var timeResult = app.getTimeforUse(timestamp);

    that.timeEnd = timeResult
    console.log("timeEnd", that.timeEnd)
    console.log("timebegin", that.timeBegin)
    var b = ((that.timeEnd - that.timeBegin) > 60) ? 60 : (that.timeEnd - that.timeBegin)
    console.log("b", b)
    that.timeBegin = timeResult

    that.data.word.forEach(function(item, index) {
      app.globalData.overallWordList[index].learnTime = b
    })



  },

  sound_AE(e) {
    console.log(1);
    var index = e.currentTarget.dataset.index;
    ++this.data.word[index].numclick;
    innerAudioContext.src = "cloud://cloud-14ij5.636c-cloud-14ij5-1301705689/" + this.data.word[index].word + "_AE.mp3";

    setTimeout(function() {
      innerAudioContext.play();
    }.bind(this), 300)

  },
  sound_BE(e) {
    console.log(2);
    var index = e.currentTarget.dataset.index;
    ++this.data.word[index].numclick;
    innerAudioContext.src = "cloud://cloud-14ij5.636c-cloud-14ij5-1301705689/" + this.data.word[index].word + "_BE.mp3";

    setTimeout(function() {
      innerAudioContext.play();
    }.bind(this), 300)

  },

  addPropertyInListLocally(a) {
    var word = a
    var that = this


    if (app.globalData.overallWordList[0].theDifficultyByUser == undefined) {
      that.data.word.forEach(function(item, index) {

        app.globalData.overallWordList[index].theDifficultyByUser = -1

      })

    }
    if (that.data.word[0].id2 == undefined) {
      that.data.word.forEach(function(item, index) {

        var id2 = "word[" + index + "].id2";
        that.setData({
          [id2]: index + 1
        })


      })



    }
    if (app.globalData.overallWordList[0].numclick == undefined) {
      that.data.word.forEach(function(item, index) {

        app.globalData.overallWordList[index].numclick = 0

      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      word: app.globalData.overallWordList,
    })
    this.addPropertyInListLocally(this.data.word)
    if (this.data.word[0].id2 == 1) {
      var timestamp = Date.parse(new Date());
      console.log("当前时间戳为：" + timestamp);
      var timeResult = app.getTimeforUse(timestamp);

      this.timeBegin = timeResult


    }
  },



  touchStart: function(e) {

    startX = e.touches[0].pageX; // 获取触摸时的原点

    moveFlag = true;

  },

  // 触摸移动事件

  touchMove: function(e) {

    endX = e.touches[0].pageX; // 获取触摸时的原点

    if (moveFlag) {

      if (endX - startX > 50) {

        console.log("move right");

        this.move2right();

        moveFlag = false;

      }

      if (startX - endX > 50) {

        console.log("move left");

        this.move2left();

        moveFlag = false;

      }

    }

  },

  // 触摸结束事件

  touchEnd: function(e) {

    moveFlag = true; // 回复滑动事件

  },

  //向左滑动操作

  move2left() {

    var that = this;

    if (this.data.id == app.globalData.overallWordList.length) {

      return

    }

    var animation = wx.createAnimation({

      duration: 1000,

      timingFunction: 'ease',

      delay: 100

    });

    animation.opacity(0.2).translate(-500, 0).step()

    this.setData({

      ani: animation.export(),
      selectedindex: -1
    })

    var idm = that.data.id;
    if (idm < app.globalData.overallWordList.length) {
      console.log(that.data.id);
      that.setData({
        id: idm + 1
      })
    } else {
      wx.navigateTo({
        url: '../wordTest/wordTest',
      })
    }

  },

  //向右滑动操作

  move2right() {

    var that = this;

    if (this.data.id == 1) {

      return

    }

    var animation = wx.createAnimation({

      duration: 1000,

      timingFunction: 'ease',

      delay: 100

    });

    animation.opacity(0.2).translate(500, 0).step()

    this.setData({

      ani: animation.export(),
      selectedindex: -1
    })

    var idm = that.data.id;
    if (idm > 1) {
      console.log(that.data.id);
      that.setData({
        id: idm - 1
      })
    }

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