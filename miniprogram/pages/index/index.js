//index.js
//获取应用实例

const app = getApp()
const regeneratorRuntime = require('regenerator-runtime')
const tf = require('@tensorflow/tfjs-core')
const tfl = require('@tensorflow/tfjs-layers')

Page({
  async onReady() {
    const net = await this.loadModel()
    const net2 = await this.loadModel2()
  },
  async loadModel() {
    const net = await tfl.loadLayersModel('https://faderer-1301664148.cos.ap-shanghai.myqcloud.com/old/model.json')
    net.summary() 
    var result = await net.predict(tf.tensor([[1, 2, 3, 4]])).data()
    console.log(result)
    return net

  },
  //预测
  async loadModel2() {
    const net = await tfl.loadLayersModel('https://faderer-1301664148.cos.ap-shanghai.myqcloud.com/new/model.json')
    net.summary()
    var result = await net.predict(tf.tensor([[4, 3, 5, 3]])).data()
    console.log(result)
    return net

  },
  data: {
    motto: 'Cheers for all who move forward',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.redirectTo({
    
      url: '../infomationGet/infomationGet'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
