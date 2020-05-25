 // 注：也可以不引入， initChart 方法已经将 F2 传入，如果需要引入，注意需要安装 @antv/wx-f2 依赖
var app=getApp();
let chart = null;
function initChart(canvas, width, height, F2)  {
  chart = new F2.Chart({
    el: canvas,
    width,
    height,
    id: 'container',
    
    padding: [ 20, 'auto' ]
  });
  const data = [{
    name: '股票类',
    percent: 83.59,
    a: '1'
  }, {
    name: '债券类',
    percent: 2.17,
    a: '1'
  }, {
    name: '现金类',
    percent: 14.24,
    a: '1'
  }];
  
  const map = {};
  data.forEach(function(obj) {
    map[obj.name] = obj.percent + '%';
  });
  
  
  chart.source(data, {
    percent: {
      formatter: function formatter(val) {
        return val + '%';
      }
    }
  });
  chart.tooltip(false);
  chart.legend({
    position: 'right',
    itemFormatter: function itemFormatter(val) {
      return val + '    ' + map[val];
    }
  });
  chart.coord('polar', {
    transposed: true,
    innerRadius: 0.7,
    radius: 0.85
  });
  chart.axis(false);
  chart.interval()
    .position('a*percent')
    .color('name', [ '#FE5D4D', '#3BA4FF', '#737DDE' ])
    .adjust('stack');
  
  /*chart.guide().html({
    position: [ '50%', '45%' ],
    html: `<div style="width: 250px;height: 40px;text-align: center;">
        <div style="font-size: 16px">总资产</div>
        <div style="font-size: 24px">133.08 亿</div>
      </div>`
  });*/
  chart.render();

  return chart;
}

Page({
  data: {
    opts: {
      onInit: initChart
    }
  },

  onReady() {
    
  }
});
function change(){
  chart.changeData(app.globalData.c)
  console.log(2)
}
