// pages/endTest/endTest.js
const app = getApp()
const regeneratorRuntime = require('regenerator-runtime')
const tf = require('@tensorflow/tfjs-core')
const tfl = require('@tensorflow/tfjs-layers')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:[]
  },
  gotoImformationGet(){
      wx.navigateTo({
        url: '../infomationGet/infomationGet',
      })
  },
  gotowordShow(){
    wx.redirectTo({
      url: '../infomationGet/infomationGet',
    })
  },
  async calculateMem(){
    //打印记忆指数
  },


async onLoad() {
  //确保已运行过预测模型和测试后对所有单词运行记忆指数调整模型
  var mat = []//参数矩阵
  for (var i = 0; i < app.globalData.overallWordList.length; ++i) {
    var singleMat = []
    singleMat.push(app.globalData.overallWordList[i].isSelected)
    singleMat.push(app.globalData.overallWordList[i].numclick)
    singleMat.push(app.globalData.overallWordList[i].theDifficultyByUser)
    //singleMat.push(app.globalData.overallWordList[i].isSelected)
    singleMat.push(app.globalData.overallWordList[i].numOfWrongClick)//在读取不到测试数据时，默认最坏情况（选了四次才选到）
    mat.push(singleMat)
  }
  var result = await this.loadModel(mat)//模型运行
  for (var i = 0; i < app.globalData.overallWordList.length; ++i) {
    app.globalData.overallWordList[i].memory_num = result[i]
    console.log(result[i])
  }
  console.log('overallWordList')
  console.log(app.globalData.overallWordList)
  //推送记忆指数给云端数据库
  for (var i = 0; i < app.globalData.overallWordList.length; ++i){
    app.globalData.db_id = app.globalData.overallWordList[i]._id + ""
    app.globalData.db_m_n = app.globalData.overallWordList[i].memory_num
    //app.globalData.db_userx = app.globalData.overallWordList[i].word
    app.globalData.db_word = app.globalData.overallWordList[i].word
    console.log(app.globalData.overallWordList[i].memory_num)
    console.log(app.globalData.db_m_n)
    console.log(app.globalData.rememberNow)
    if (app.globalData.rememberNow == "gaokao"){
      app.updDatagaokao()
      //app.globalData.db_userx = "1"
      app.updUsersmry()
      console.log('更新gaokao成功')
    }
    if (app.globalData.rememberNow == "cet6") {
      app.updData6()
      app.updUsersmry()
      console.log('更新cet6成功')
    }
    if (app.globalData.rememberNow == "gre") {
      app.updDatagre()
      app.updUsersmry()
      console.log('更新gre成功')
    }
    if (app.globalData.rememberNow == "toefl") {
      app.updDatatoefl()
      app.updUsersmry()
      console.log('更新toefl成功')
    }
  }

    app.globalData.flagForIndentify= app.globalData.flagForIndentify+1
    console.log("第二次进入",app.globalData.flagForIndentify)
    if(app.globalData.flagForIndentify==1){
      app.yun();
      
      var timer = setInterval(function () {
        console.log("循环定时器等待循环请求结束")
       
      if (app.globalData.overallWordList[0]._id !=undefined ) {
     
          console.log('轮询已完成')
          clearInterval(timer);
        }
      }, 500)
      //ifuser 函数位置
      
      console.log("用户注册了吗？")
      console.log("用户名",app.globalData.db_userx)
      
      app.IfUsers()
    }

    if(app.globalData.flagForIndentify==2){
      var timestamp = Date.parse(new Date());
      console.log("当前时间戳为：" + timestamp);
      var timeResult = app.getTimeforUse(timestamp);
      app.globalData.timeEnd = timeResult
      console.log("timeEnd", app.globalData.timeEnd)
      console.log("timebegin", app.globalData.timeBegin)
      var b = ((app.globalData.timeEnd - app.globalData.timeBegin) > 60) ? 60 : (app.globalData.timeEnd -app.globalData.timeBegin)
      console.log("b", b)
      app.globalData.timeBegin = timeResult

     
      app.globalData.totalLearnTime = app.globalData.totalLearnTime +b
    
    }
    if(app.globalData.flagForIndentify>=2 || app.globalData.flagForIndentify==1){
        //拉下来user的背诵过的所有单词
        console.log("用户背过哪些单词呢？")
        app.IfUsers()
        console.log("wordfetch:",app.globalData.wordfetch)
        
    }
    this.setData({
      word: app.globalData.flagForIndentify
    })
},

  //加载模型一：记忆指数调整模型
  async loadModel(mat) {
    const net = await tfl.loadLayersModel('https://wxz-1301710654.cos.ap-shanghai.myqcloud.com/old/model.json')
    //net.summary()
    var result = await net.predict(tf.tensor(mat)).data()
    //console.log(result)
    return result

  },
  //加载模型二：预测模型
  async loadModel2(mat) {
    const net = await tfl.loadLayersModel('https://wxz-1301710654.cos.ap-shanghai.myqcloud.com/new/model.json')
    //net.summary()
    var result = await net.predict(tf.tensor(mat)).data()
    //console.log(result)
    return result

  }
})