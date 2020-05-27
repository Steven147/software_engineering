// pages/infoget/infoget.js
var app = getApp()
const regeneratorRuntime = require('regenerator-runtime')
const tf = require('@tensorflow/tfjs-core')
const tfl = require('@tensorflow/tfjs-layers')

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    allIsSelected:false,
    isSelected:0,
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    numOfPlan:50,
    numOfReview:0,
    isOkay:0
  },

  
  confirm :function(e){
    this.setData({
      allIsSelected:true
    })
  },
  inputChangeHandle: function (e) {
    this.setData({
     numOfPlan:e.detail.value
    })
   
  },
  reviewinputChangeHandle: function (e) {
    this.setData({
     numOfReview:e.detail.value
    })
   
  },
  addTodoHandle: function (e) {
    var that=this
    that.setData({
      munOfPlan:e.detail.value
     })
    
   
  },
  reviewaddTodoHandle: function (e) {
    var that=this
    that.setData({
      munOfReview:e.detail.value
     })
    
   
  },
  async preCalculate(){
   //如果要用计划数：用 this.data.numOfPlan
    //拉取单词
    wx.showLoading({

      title: '数据加载中。。。',
      
      });
    app.globalData.recommendWordList = app.globalData.overallWordList
    //运行预测模型初始化未初始化过的单词
    var mat2 = []//参数矩阵
    for (var i = 0; i < app.globalData.recommendWordList.length; ++i) {
      var singleMat = []
      var word_len = app.globalData.recommendWordList[i].word.length
      var word_char_count = new Set(app.globalData.recommendWordList[i].word).size
      var pronounce_len = app.globalData.recommendWordList[i].yinbiao_AE.length
      var pron_char_count = new Set(app.globalData.recommendWordList[i].yinbiao_AE).size
      singleMat.push(word_len)
      singleMat.push(word_char_count)
      singleMat.push(pronounce_len)
      singleMat.push(pron_char_count)
      mat2.push(singleMat)
    }
    var result = await this.loadModel2(mat2)//模型运行
    for (var i = 0; i < app.globalData.recommendWordList.length; ++i) {
      // if(app.globalData.overallWordList[i].memory_num === 100){
      //   app.globalData.overallWordList[i].memory_num = result[i]
      //   console.log(result[i])      
      // }
      app.globalData.overallWordList[i].memory_num = result[i]
      console.log(result[i])
  }
  console.log('recommendWordList')
  console.log(app.globalData.recommendWordList)
  //数组排序
  function ascend(x,y){
    return x.memory_num - y.memory_num;  //按照数组的第4个值升序排列
  }
  app.globalData.recommendWordList.sort(ascend)
  console.log('recommendWordList排序')
  console.log(app.globalData.recommendWordList)
  //单词推荐
  var temp = []
  var num_kuai = Math.floor(app.globalData.recommendWordList.length / this.data.numOfPlan) //每块的单词数
  for (var i = 0; i <= num_kuai * (this.data.numOfPlan-1); i += num_kuai){
    //将单词按照分块，在每块随机选出一个单词推荐给用户
    var index = Math.floor((Math.random() * num_kuai)) + i
    temp.push(app.globalData.recommendWordList[index])
  }
  app.globalData.recommendWordList = temp
  console.log('recommendWordList最终排序')
  console.log(app.globalData.recommendWordList)
  //获取用户已经背过的单词 
  /*for (var k = 0; i < app.globalData.wordfetch[0].cet6.length; ++i) {
    app.globalData.overallWordList[i].memory_num = result[i]
    console.log(result[i])
}*/
 /* for (var k in app.globalData.wordfetch[0].cet6)
  {
    console.log(app.yun1()) 
  }
  for (var k in app.globalData.wordfetch[0].gaokao)
  {
    app.yun2() 
  }
  for (var k in app.globalData.wordfetch[0].gre)
  {
    app.yun3() 
  }
  for (var k in app.globalData.wordfetch[0].toefl)
  {
    app.yun4() 
  }*/
 
  var temp1 = []
  temp1 = app.globalData.wordfetch[0].toefl
  console.log(temp1)
  console.log("字典元素按value值排序: ");
  var res2 = Object.keys(temp1).sort(function(a,b){ return temp1[a]["score"]-temp1[b]["score"];});
  for(var key in res2){
    app.yun4(res2[key])
      console.log("key: " + res2[key] + " ,value: " + temp1[res2[key]]);
  }
  app.globalData.rememberList = app.globalData.rememberList.contact(temp1.splice(0,this.data.numOfReview))
  console.log('app.globalData.rememberList',app.globalData.rememberList)

  wx.hideLoading();
  this.setData({
    isOkay:5
  })
  },

  choiceBook1: function () {
    this.setData({
      isSelected:1
    })
    app.getwordgaokao();
    app.globalData.rememberList.push("gaokao")
    app.globalData.rememberNow="gaokao"
    console.log(this.data.isSelected)
  },
  choiceBook2: function () {
      app.getword6();
      this.setData({
        isSelected:2
      })
      app.globalData.rememberList.push("cet6")
      app.globalData.rememberNow="cet6"
      console.log(this.data.isSelected)
  },
  choiceBook3: function () {
    app.getwordgre();
    this.setData({
      isSelected:3
    })
    app.globalData.rememberList.push("gre")
    app.globalData.rememberNow="gre"
    console.log(this.data.isSelected)
  },
  choiceBook4: function () {
    app.getwordtoefl();
    this.setData({
      isSelected:4
    })
    app.globalData.rememberList.push("toefl")
    app.globalData.rememberNow="toefl"
    console.log(this.data.isSelected)
  },
  jumptowordlist: function () {

    app.globalData.overallWordList= app.globalData.overallWordList.splice(0,this.data.numOfPlan)
    
    wx.redirectTo({
      url: '../remeberList/remeberList'

    })
    
  },
  jumptowordlist2: function () {
    app.globalData.overallWordList= app.globalData.recommendWordList
    
    wx.redirectTo({
      url: '../remeberList/remeberList'

    })
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