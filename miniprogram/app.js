//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: "cloud-14ij5"
    })
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
  },
  overallWordList: [
    { content: 'a', index: 0, studyresult: 1, studytime: 2000, testresult: 1, testtime: 2000, rank: 0 },
    { content: 'about', index: 1, studyresult: 0, studytime: 12000, testresult: 1, testtime: 5600, rank: 0 },
    { content: 'as', index: 2, studyresult: 1, studytime: 2500, testresult: 0, testtime: 2400, rank: 0 },
    { content: 'also', index: 3, studyresult: 1, studytime: 6400, testresult: 1, testtime: 7500, rank: 0 },
    { content: 'and', index: 4, studyresult: 0, studytime: 7800, testresult: 1, testtime: 6600, rank: 0 },
    { content: 'because', index: 5, studyresult: 0, studytime: 0, testresult: 0, testtime: 10, rank: 0 },
    { content: 'could', index: 6, studyresult: 0, studytime: 0, testresult: 0, testtime: 10, rank: 0 }
  ]
})