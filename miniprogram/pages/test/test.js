// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"words ranking by lsq",
    //单词表
    overallWordList:[
      { content: 'a', index: 0, rank: 110},
      { content: 'about', index: 1, rank: 80 },
      { content: 'as', index: 2, rank: 110 },
      { content: 'also', index: 3, rank: 50 },
      { content: 'and', index: 4, rank: 60 },
      { content: 'because', index: 5, rank: 0 },
      { content: 'could', index: 6, rank: 0 }
    ],
    msg1:[],//显示数据一
    msg2: [],
    msg3: [],
    msg4: []

  },
  //选择函数，在结束学习的时候开始执行
  ranking(){
    console.log("start ranking");
    //今日单词、明日单词
    var tomorrowWordIndex = [];
    var tomorrowWordList = [];
    var todayWordIndex = [];
    var todayWordList = [];
    var i,j;
    //读取今日的五个单词
    for (i = 0,j = 5; i < 5; i++) {
      //将今日的五个单词的内容和位置，储存到todayWordList、todayWordIndex中
      todayWordList.push(this.data.overallWordList[i].content)
      todayWordIndex.push(this.data.overallWordList[i].index);
      //如果记忆指数小于100 放入明日的单词列表中
      if (this.data.overallWordList[i].rank < 100){
        tomorrowWordList.push(this.data.overallWordList[i].content);
        tomorrowWordIndex.push(this.data.overallWordList[i].index);
      } 
      //否则，替换为还没有背过的单词
      else{
        tomorrowWordList.push(this.data.overallWordList[j].content);
        tomorrowWordIndex.push(this.data.overallWordList[j].index);
        j++;
      }
    }
    //将今日、明日单词列表复制给显示数据
    this.setData({
      msg3: tomorrowWordIndex,
      msg4: tomorrowWordList,
      msg1: todayWordIndex,
      msg2: todayWordList,
    })

  },


  getWords(){
    wx.request({
      url: '',
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