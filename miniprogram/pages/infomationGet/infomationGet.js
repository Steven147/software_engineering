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

  reSelected:function(e){
    this.setData({
      isSelected:0
    })
  },
  confirm :function(e){
    if(this.data.isSelected==0){
      wx.showModal({
        title: '请先选择词书',
      })
    }
    else{
      this.setData({
        allIsSelected:true
      })
    }
    
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

      title: '数据加载中. . .',
      
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
 
  console.log(app.globalData.db_userx)
  var temp1 = []
  var temp2 = []
  temp1 = app.globalData.mryed_word
  console.log(temp1)
  for(var i in temp1){
    // console.log("字典元素按value值排序: ");
    var res2 = Object.keys(temp1[i].memory_num)
    for(var key in res2){
      if (res2[key] == app.globalData.db_userx){
        temp1[i].memory_num = temp1[i].memory_num[res2[key]]
        // temp2.push([temp1[i],temp1[i].memory_num[res2[key]]])
      }
      // temp2.push(temp1[i].memory_num[res2[key]])
      // console.log("key: " + res2[key] + " ,value: " + temp1[i].memory_num[res2[key]]);
    }
  }
  // console.log(temp2)
  // function paixu(x,y){
  //   return x[1] - y[1];  //按照数组的记忆指数升序排列
  // }
  // temp2.sort(paixu)
  // var temp3 = []
  // for (var i in temp2){
  //   temp3.push(temp2[i][0])
  // }
  // console.log(temp3)
  console.log(temp1.splice(0,this.data.numOfReview))  //复习的单词
  app.globalData.mryed_word=temp1.splice(0,this.data.numOfReview)
  // app.globalData.overallWordList = app.globalData.overallWordList.concat()
  // console.log('app.globalData.overallwordlist',app.globalData.overallWordList)
  
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
    app.yun2()
    app.globalData.rememberList.push("gaokao")
    app.globalData.rememberNow="gaokao"
    console.log(this.data.isSelected)
  },
  choiceBook2: function () {
      app.getword6();
      app.yun1()
      this.setData({
        isSelected:2
      })
      app.globalData.rememberList.push("cet6")
      app.globalData.rememberNow="cet6"
      console.log(this.data.isSelected)
  },
  choiceBook3: function () {
    app.getwordgre();
    app.yun3()
    this.setData({
      isSelected:3
    })
    app.globalData.rememberList.push("gre")
    app.globalData.rememberNow="gre"
    console.log(this.data.isSelected)
  },
  choiceBook4: function () {
    app.getwordtoefl();
    app.yun4()
    this.setData({
      isSelected:4
    })
    app.globalData.rememberList.push("toefl")
    app.globalData.rememberNow="toefl"
    console.log(this.data.isSelected)
  },
  jumptowordlist: function () {

    app.globalData.overallWordList= app.globalData.overallWordList.splice(0,this.data.numOfPlan)
    app.globalData.overallWordList=app.globalData.overallWordList.concat(app.globalData.mryed_word)
    wx.redirectTo({
      url: '../remeberList/remeberList'

    })
    
  },
  jumptowordlist2: function () {
    app.globalData.overallWordList= app.globalData.recommendWordList
    app.globalData.overallWordList=app.globalData.overallWordList.concat(app.globalData.mryed_word)
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