// pages/endShow/endShow.js

const app = getApp()
const regeneratorRuntime = require('regenerator-runtime')
const tf = require('@tensorflow/tfjs-core')
const tfl = require('@tensorflow/tfjs-layers')

Page({
  async onLoad() {
    //运行预测模型初始化单词
    var mat2 = []//参数矩阵
    for (var i = 0; i < app.globalData.overallWordList.length; ++i) {
      var singleMat = []
      var word_len = app.globalData.overallWordList[i].word.length
      var word_char_count = new Set(app.globalData.overallWordList[i].word).size
      var pronounce_len = app.globalData.overallWordList[i].yinbiao_AE.length
      var pron_char_count = new Set(app.globalData.overallWordList[i].yinbiao_AE).size
      singleMat.push(word_len)
      singleMat.push(word_char_count)
      singleMat.push(pronounce_len)
      singleMat.push(pron_char_count)
      mat2.push(singleMat)
    }
    var result = await this.loadModel2(mat2)//模型运行
    for (var i = 0; i < app.globalData.overallWordList.length; ++i) {
       if(app.globalData.overallWordList[i].memory_num == null){
         app.globalData.overallWordList[i].memory_num = result[i]   
       }
      
    }
    console.log('预测单词记忆指数：')
    console.log(app.globalData.overallWordList)

    //确保已运行过预测模型后
    //运行记忆指数调整模型
    var mat = []//参数矩阵
    for (var i = 0; i < app.globalData.overallWordList.length; ++i) {
      var singleMat = []
      singleMat.push(app.globalData.overallWordList[i].isSelected)
      singleMat.push(app.globalData.overallWordList[i].numclick)
      singleMat.push(app.globalData.overallWordList[i].theDifficultyByUser)
      singleMat.push(app.globalData.overallWordList[i].learnTime)
      singleMat.push(0)//在读取不到测试数据时，0为默认情况
      singleMat.push(0)//在读取不到测试数据时，0为默认情况
      mat.push(singleMat)
    }
    var result = await this.loadModel(mat)//模型运行
    console.log(result)
    for (var i = 0; i < app.globalData.overallWordList.length; ++i) {
      app.globalData.overallWordList[i].memory_num += result[i]
    }
    console.log('调整记忆指数：')
    console.log(app.globalData.overallWordList)
  },




  //加载模型一：记忆指数调整模型
  async loadModel(mat) {
    const net = await tfl.loadLayersModel('https://wxz-1301710654.cos.ap-shanghai.myqcloud.com/old/model.json')
    var result = await net.predict(tf.tensor(mat)).data()
    return result

  },



  //加载模型二：预测模型
  async loadModel2(mat) {
    const net = await tfl.loadLayersModel('https://wxz-1301710654.cos.ap-shanghai.myqcloud.com/new/model.json')
    var result = await net.predict(tf.tensor(mat)).data()
    return result

  },

  /**
   * 页面的初始数据
   */
  data: {

  },

goIndex(){
  wx.navigateTo({
    url: '../index/index',
  })
},
goTest() {
    wx.navigateTo({
      url: '../wordTest/wordTest',
    })
  },
  gowordShow() {
    wx.navigateTo({
      url: '../wordShow/wordShow',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   console.log(app.globalData.overallWordList)
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //onReady: function () {

  //},

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