 // 注：也可以不引入， initChart 方法已经将 F2 传入，如果需要引入，注意需要安装 @antv/wx-f2 依赖
var app=getApp();
let chart = null;
let chart2 = null;


function initChart(canvas, width, height, F2)  {
  chart = new F2.Chart({
    el: canvas,
    width,
    height,
    id: 'container',
  });
  var totalNum= app.globalData.nine_more+app.globalData.sevenTonine+app.globalData.sixToseven+app.globalData.six_less
  const data = [
    { name: '>90', percent: app.globalData.nine_more/ totalNum, type: '1' }, 
    { name: '75-90', percent: app.globalData.sevenTonine/totalNum, type: '1' },
    { name: '60-75', percent: app.globalData.sixToseven/totalNum, type: '1' },
    { name: '<60', percent:app.globalData.six_less/totalNum, type: '1' },
   
    { name: '>90', percent:app.globalData.nine_more/ totalNum, type: '2' },
    { name: '75-90', percent: app.globalData.sevenTonine/totalNum, type: '2' },
    { name: '60-75', percent: app.globalData.sixToseven/totalNum, type: '2' },
    { name: '<60', percent: app.globalData.six_less/totalNum, type: '2' },
    
  ];
  
  
  chart.source(data);
  chart.legend({
    position: 'right'
  });
  chart.tooltip(false);
  chart.coord('polar', {
    transposed: true,
    radius: 0.8,
    inner: 0.5
  });
  chart.axis(false);
  chart.interval()
    .position('type*percent')
    .color('name', [
      '#1890FF',
      '#13C2C2',
      '#2FC25B',
      '#FACC14',
      '#F04864',
      '#8543E0'
    ])
    .adjust('stack');
  
  chart.interaction('pie-select', {
    startEvent: 'tap',
    animate: {
      duration: 300,
      easing: 'backOut'
    },
    cancelable: true
  });
  
  chart.render();
  

  return chart;
}

Page({
  data: {
    opts: {
      onInit: initChart
    },
    opt2: {
      onInit: initChart2
    }
  },
 
   
  onReady() {
    
  },
  onload:function (options){
    app.IfUsers()
  },
  calculateMem(){
    wx.showLoading({

      title: '数据加载中. . .',
      
      });

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
    var totalNum= app.globalData.nine_more+app.globalData.sevenTonine+app.globalData.sixToseven+app.globalData.six_less
    console.log("toatl",totalNum)
    var value1=app.globalData.nine_more/ totalNum
    var value2=app.globalData.sevenTonine/totalNum
    var value3=app.globalData.sixToseven/totalNum
    var value4=app.globalData.six_less/totalNum
    console.log("value",value1,value2,value3,value4)
    var data2 = [{
      year: '高考',
      sales:  app.globalData.gaokao
    }, {
      year: '托福',
      sales: app.globalData.toefl
    }, {
      year: 'CET6',
      sales: app.globalData.cet6
    }, {
      year: 'GRE',
      sales:   app.globalData.gre
    }
    ];
    chart2.changeData(data2)
    var data = [ { name: '>90', percent: value1, type: '1' }, 
    { name: '75-90', percent: value2, type: '1' },
    { name: '60-75', percent: value3, type: '1' },
    { name: '<60', percent:value4, type: '1' },
   
    { name: '>90', percent:value1, type: '2' },
    { name: '75-90', percent: value2, type: '2' },
    { name: '60-75', percent: value3, type: '2' },
    { name: '<60', percent: value4, type: '2' },
    ];
    console.log(app.globalData)
    chart.changeData(data)
    wx.hideLoading();
  },
});



function initChart2(canvas, width, height, F2)  {
 
  chart2 = new F2.Chart({
    el: canvas,
    width,
    height,
    id: 'container',
  });
  const data = [{
    year: '高考',
    sales:  app.globalData.gaokao
  }, {
    year: '托福',
    sales: app.globalData.toefl
  }, {
    year: 'CET6',
    sales: app.globalData.cet6
  }, {
    year: 'GRE',
    sales:   app.globalData.gre
  }
  ];
  
  
  chart2.source(data, {
    sales: {
      tickCount:5
    }
  });
  chart2.coord({
    transposed: true
  });
  chart2.tooltip({
    showItemMarker: false,
    onShow: function onShow(ev) {
      const items = ev.items;
      items[0].name = null;
      items[0].name = items[0].title;
      items[0].value = '已背诵词汇数' + items[0].value;
    }
  });
  chart2.interval().position('year*sales');
  chart2.render();
  
  

  return chart2;
}
