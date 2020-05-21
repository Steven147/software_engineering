// pages/endShow/endShow.js

const app = getApp()
const regeneratorRuntime = require('regenerator-runtime')
const tf = require('@tensorflow/tfjs-core')
const tfl = require('@tensorflow/tfjs-layers')

Page({
  async onLoad() {
    //如果记忆指数没有初始化，则运行预测模型
    //lqx。。。。。。
  
    //已经背诵过，运行记忆指数调整模型
    var mat = []//参数矩阵
    for (var i = 0; i < app.globalData.overallWordList.length; ++i) {
      var singleMat = []
      singleMat.push(app.globalData.overallWordList[i].isSelected)
      singleMat.push(app.globalData.overallWordList[i].numclick)
      singleMat.push(-app.globalData.overallWordList[i].theDifficultyByUser)
      //singleMat.push(app.globalData.overallWordList[i].isSelected)
      singleMat.push(4)//在读取不到测试数据时，默认最坏情况（选了四次才选到）
      mat.push(singleMat)
    }
    var result = await this.loadModel(mat)//模型运行
    //console.log('result')
    //console.log(result)
    //记忆指数储存
    for (var i = 0; i < app.globalData.overallWordList.length; ++i) {
      app.globalData.overallWordList[i].memory_num = result[i]
    }
    console.log('overallWordList')
    console.log(app.globalData.overallWordList)
  },




  //加载模型一：记忆指数调整模型
  async loadModel(mat) {
    const net = await tfl.loadLayersModel('https://faderer-1301664148.cos.ap-shanghai.myqcloud.com/old/model.json')
    //net.summary()
    var result = await net.predict(tf.tensor(mat)).data()
    //console.log(result)
    return result

  },



  //加载模型二：预测模型
  async loadModel2(mat) {
    const net = await tfl.loadLayersModel('https://faderer-1301664148.cos.ap-shanghai.myqcloud.com/new/model.json')
    //net.summary()
    var result = await net.predict(tf.tensor(mat)).data()
    //console.log(result)
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
  goselect(){
    wx.navigateTo({
      url: '../remeberList/remeberList',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  //onLoad: function (options) {
    
  //},

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