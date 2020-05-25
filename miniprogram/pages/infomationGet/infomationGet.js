// pages/infoget/infoget.js

var app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {

    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    numOfPlan:50
  },

  
  
  inputChangeHandle: function (e) {
    this.setData({
     numOfPlan:e.detail.value
    })
   
  },

  addTodoHandle: function (e) {
    var that=this
    that.setData({
      munOfPlan:e.detail.value
     })
    
   
  },
  async preCalculate(){
    //如果要用计划数：用 this.data.numOfPlan
    //拉取单词
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
      if(app.globalData.recommendWordList[i].memory_num === 100){
        app.globalData.recommendWordList[i].memory_num = result[i]
        console.log(result[i])
      }
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
  for (var i = 0; i < app.globalData.recommendWordList.length - num_kuai; i += num_kuai){
    //将单词按照分块，在每块随机选出一个单词推荐给用户
    index = Math.floor((Math.random() * num_kuai)) + i
    temp.push(app.globalData.recommendWordList[index])
  }
  app.globalData.recommendWordList = temp
  },
  choiceBook1: function () {
    app.getwordgaokao();
    app.globalData.rememberList.push("gaokao")
    app.globalData.rememberNow="gaokao"
    console.log(app.globalData.rememberList)
  },
  choiceBook2: function () {
      app.getword6();
    
      app.globalData.rememberList.push("cet6")
      app.globalData.rememberNow="cet6"
      console.log(app.globalData.rememberList)
  },
  choiceBook3: function () {
    app.getwordgre();
    
    app.globalData.rememberList.push("gre")
    app.globalData.rememberNow="gre"
    console.log(app.globalData.rememberList)
  },
  choiceBook4: function () {
    app.getwordtoefl();
    
    app.globalData.rememberList.push("toefl")
    app.globalData.rememberNow="toefl"
    console.log(app.globalData.rememberList)
  },
  jumptowordlist: function () {

    app.globalData.overallWordList= app.globalData.overallWordList.splice(0,this.data.numOfPlan)
    
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