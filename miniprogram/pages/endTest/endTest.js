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
    word:[],
    isokay:0
  },
  gotoImformationGet(){
      wx.navigateTo({
        url: '../infomationGet/infomationGet',
      })
  },
  gotoword(){
    app.globalData.flagForIndentify=0
    this.onLoad();
     
  },
  gotowordShow(){
   
    wx.redirectTo({
      url: '../infomationGet/infomationGet',
    })
     
  },
  
  calculateMem(){
    wx.showLoading({

      title: '数据加载中. . .',
      
      });
      
      var data
      app.IfUsers()
   
      var i=0
      var timer = setInterval(function () {
        console.log("循环定时器等待循环请求结束")
        
        if (i>2 ) {
       
          console.log('333')
          console.log("wordfetch:",app.globalData.wordfetch)
           //这个位置，处理下拉的全局变量wordFetch,把他根据记忆指数分成四个区间，可以只统计每一组的个数，而忽略单词内容，并存储到全局变量
      app.globalData.nine_more=0
      app.globalData.sevenTonine=0
      app.globalData.sixToseven=0
      app.globalData.six_less= 0
    console.log("app.globalData.wordfetch.length",app.globalData.wordfetch.length)
    var totalNum= app.globalData.nine_more+app.globalData.sevenTonine+app.globalData.sixToseven+app.globalData.six_less
    console.log("totalnum",totalNum)
    //获取单词的词书区间
    

    let length= Object.keys(app.globalData.wordfetch[0].cet6).length
    app.globalData.cet6 = length
    let length1= Object.keys(app.globalData.wordfetch[0].gaokao).length
    app.globalData.gaokao = length1
    let length2= Object.keys(app.globalData.wordfetch[0].gre).length
    app.globalData.gre = length2
    let length3= Object.keys(app.globalData.wordfetch[0].toefl).length
    app.globalData.toefl = length3
    //获取单词所在的分数区间
    var res1 = Object.keys(app.globalData.wordfetch[0].cet6).sort(function(a,b){ return app.globalData.wordfetch[0].cet6[a]["score"]-app.globalData.wordfetch[0].cet6[b]["score"]})
    for(var key in res1){
      if(app.globalData.wordfetch[0].cet6[res1[key]] >=90){
        app.globalData.nine_more += 1
      }
      else if(app.globalData.wordfetch[0].cet6[res1[key]] >=75){
        app.globalData.sevenTonine += 1
      }
      else if(app.globalData.wordfetch[0].cet6[res1[key]] >=60){
        app.globalData.sixToseven += 1
      }
      else{
        app.globalData.six_less += 1
      }
      console.log("key: " + res1[key] + " ,value: " + app.globalData.wordfetch[0].cet6[res1[key]]);
    }
    var res1 = Object.keys(app.globalData.wordfetch[0].gaokao).sort(function(a,b){ return app.globalData.wordfetch[0].gaokao[a]["score"]-app.globalData.wordfetch[0].gaokao[b]["score"]})
    for(var key in res1){
      if(app.globalData.wordfetch[0].gaokao[res1[key]] >=90){
        app.globalData.nine_more += 1
      }
      else if(app.globalData.wordfetch[0].gaokao[res1[key]] >=75){
        app.globalData.sevenTonine += 1
      }
      else if(app.globalData.wordfetch[0].gaokao[res1[key]] >=60){
        app.globalData.sixToseven += 1
      }
      else{
        app.globalData.six_less += 1
      }
      console.log("key: " + res1[key] + " ,value: " + app.globalData.wordfetch[0].gaokao[res1[key]]);
    }
    var res1 = Object.keys(app.globalData.wordfetch[0].gre).sort(function(a,b){ return app.globalData.wordfetch[0].gre[a]["score"]-app.globalData.wordfetch[0].gre[b]["score"]})
    for(var key in res1){
      if(app.globalData.wordfetch[0].gre[res1[key]] >=90){
        app.globalData.nine_more += 1
      }
      else if(app.globalData.wordfetch[0].gre[res1[key]] >=75){
        app.globalData.sevenTonine += 1
      }
      else if(app.globalData.wordfetch[0].gre[res1[key]] >=60){
        app.globalData.sixToseven += 1
      }
      else{
        app.globalData.six_less += 1
      }
      console.log("key: " + res1[key] + " ,value: " + app.globalData.wordfetch[0].gre[res1[key]]);
    }
    var res1 = Object.keys(app.globalData.wordfetch[0].toefl).sort(function(a,b){ return app.globalData.wordfetch[0].toefl[a]["score"]-app.globalData.wordfetch[0].toefl[b]["score"]})
    for(var key in res1){
      if(app.globalData.wordfetch[0].toefl[res1[key]] >=90){
        app.globalData.nine_more += 1
      }
      else if(app.globalData.wordfetch[0].toefl[res1[key]] >=75){
        app.globalData.sevenTonine += 1
      }
      else if(app.globalData.wordfetch[0].toefl[res1[key]] >=60){
        app.globalData.sixToseven += 1
      }
      else{
        app.globalData.six_less += 1
      }
      console.log("key: " + res1[key] + " ,value: " + app.globalData.wordfetch[0].toefl[res1[key]]);
    }
   
    wx.hideLoading();
    clearInterval(timer);
  }
    i=i+1
  }, 1200)
    this.setData({
      isokay:1
    })
  
  },

async onLoad() {
  

    app.globalData.flagForIndentify= app.globalData.flagForIndentify+1
    console.log("第二次进入",app.globalData.flagForIndentify)
    if(app.globalData.flagForIndentify==1){
     
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
      //再次调整记忆指数
  var mat = []//参数矩阵
  for (var i = 0; i < app.globalData.overallWordList.length; ++i) {
    var singleMat = []
    singleMat.push(0)//不考虑背诵时的数据
    singleMat.push(0)
    singleMat.push(0)
    singleMat.push(3)
    singleMat.push(app.globalData.overallWordList[i].numOfWrongClick+1)
    singleMat.push(app.globalData.overallWordList[i].timeOnTest)
    mat.push(singleMat)
  }
  var result = await this.loadModel(mat)//模型运行
  for (var i = 0; i < app.globalData.overallWordList.length; ++i) {
    app.globalData.overallWordList[i].memory_num += result[i]
    console.log(result[i])
  }
  console.log('再次调整记忆指数')
  console.log(app.globalData.overallWordList)
  //推送记忆指数给云端数据库
  for (var i = 0; i < app.globalData.overallWordList.length; ++i){
    app.globalData.db_inc_time = app.globalData.totalLearnTime * 1
    app.globalData.db_id = app.globalData.overallWordList[i]._id + ""
    app.globalData.db_m_n = app.globalData.overallWordList[i].memory_num
    //app.globalData.db_userx = app.globalData.overallWordList[i].word
    app.globalData.db_word = app.globalData.overallWordList[i].word
    console.log('用户背诵时间',app.globalData.db_inc_time)
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
  app.Time_Inc()
  }
    if(app.globalData.flagForIndentify>=2 || app.globalData.flagForIndentify==1){
        //拉下来user的背诵过的所有单词
        console.log("用户背过哪些单词呢？")
       
        
    }
    this.setData({
      word: app.globalData.flagForIndentify
    })
    
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

  }
})