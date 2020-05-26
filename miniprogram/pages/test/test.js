 // 注：也可以不引入， initChart 方法已经将 F2 传入，如果需要引入，注意需要安装 @antv/wx-f2 依赖
var app=getApp();
let chart = null;
function initChart(canvas, width, height, F2)  {
  chart = new F2.Chart({
    el: canvas,
    width,
    height,
    id: 'container',
  });
  const data = [
    { name: '>90', percent:app.globalData.wordfetch.length/ app.globalData.overallWordList.length, type: '1' }, 
    { name: '75-90', percent: 0.18, type: '1' },
    { name: '60-75', percent: 0.15, type: '1' },
    { name: '<60', percent: 0.05, type: '1' },
    { name: '其他', percent: 0.12, type: '1' },
    { name: '>90', percent:app.globalData.wordfetch.length/ app.globalData.overallWordList.length, type: '2' },
    { name: '75-90', percent: 0.18, type: '2' },
    { name: '60-75', percent: 0.15, type: '2' },
    { name: '<60', percent: 0.05, type: '2' },
    { name: '其他', percent: 0.12, type: '2' },
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
  onload(){
    console.log("app.globalData.wordfetch.length",app.globalData.wordfetch.length)
  }
});
function change(){
  chart.changeData(app.globalData.c)
  console.log(2)
}

function initChart2(canvas, width, height, F2)  {
  chart = new F2.Chart({
    el: canvas,
    width,
    height,
    id: 'container',
  });
  const data = [{
    year: '高考',
    sales: 38
  }, {
    year: '托福',
    sales: 52
  }, {
    year: 'CET6',
    sales: 2000
  }, {
    year: 'GRE',
    sales: 145
  }
  ];
  
  
  chart.source(data, {
    sales: {
      tickCount:5
    }
  });
  chart.coord({
    transposed: true
  });
  chart.tooltip({
    showItemMarker: false,
    onShow: function onShow(ev) {
      const items = ev.items;
      items[0].name = null;
      items[0].name = items[0].title;
      items[0].value = '已背诵词汇数' + items[0].value;
    }
  });
  chart.interval().position('year*sales');
  chart.render();
  
  

  return chart;
}
