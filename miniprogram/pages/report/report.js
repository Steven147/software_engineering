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
    show:1,
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
      
      var data
      app.IfUsers()
   
      var i=0
      var timer = setInterval(function () {
        console.log("循环定时器等待循环请求结束")
        
        if (i>2 ) {
       
          console.log('333')
          console.log("wordfetch:",app.globalData.wordfetch)
     
          var totalNum= app.globalData.nine_more+app.globalData.sevenTonine+app.globalData.sixToseven+app.globalData.six_less
          console.log("toatl",totalNum)
          var value1=app.globalData.nine_more/ totalNum
          var value2=app.globalData.sevenTonine/totalNum
          var value3=app.globalData.sixToseven/totalNum
          var value4=app.globalData.six_less/totalNum
          console.log("value",value1,value2,value3,value4)
    data = [ { name: '>90', percent: value1, type: '1' }, 
    { name: '75-90', percent: value2, type: '1' },
    { name: '60-75', percent: value3, type: '1' },
    { name: '<60', percent:value4, type: '1' },
   
    { name: '>90', percent:value1, type: '2' },
    { name: '75-90', percent: value2, type: '2' },
    { name: '60-75', percent: value3, type: '2' },
    { name: '<60', percent: value4, type: '2' },
    ];
   
    chart.changeData(data)
    wx.hideLoading();

    
          clearInterval(timer);
      }
        i=i+1
      }, 200)
      


   
   
    
  },
  
  calculate2(){
    

    //这个位置，处理下拉的全局变量wordFetch,把他根据记忆指数分成四个区间，可以只统计每一组的个数，而忽略单词内容，并存储到全局变量
    //获取单词的词书区间
    wx.showLoading({

      title: '数据加载中. . .',
      
      });
      
      
   
      var i=0
      var timer = setInterval(function () {
        console.log("循环定时器等待循环请求结束")
        
        if (i>2 ) {
       
          console.log('333')
          
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
    
    wx.hideLoading();
   
          clearInterval(timer);
        }
        i=i+1
      }, 200)
      


   
   
    
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
