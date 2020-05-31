
const regeneratorRuntime = require('regenerator-runtime')
const tf = require('@tensorflow/tfjs-core')
const tfl = require('@tensorflow/tfjs-layers')

const loadModel1 = async(mat) => {
  const net = await tfl.loadLayersModel('https://wxz-1301710654.cos.ap-shanghai.myqcloud.com/old/model.json');
  var result = await net.predict(tf.tensor(mat)).data();
  return result;
}

const loadModel2 = async(mat) => {
  const net = await tfl.loadLayersModel('https://wxz-1301710654.cos.ap-shanghai.myqcloud.com/new/model.json');
  var result = await net.predict(tf.tensor(mat)).data();
  return result;
}
//var add = require('C:/Users/26230/Desktop/SoftwareUsing/weixinprogram/program0530/miniprogram/add.js');//根据函数名命名参数
function forgettingCurve(list){
  for (var i = 0; i < list.length; ++i) {
    if (list[i].memory_num >90) list[i].memory_num = list[i].memory_num*0.8
    else if (list[i].memory_num < 90 && list[i].memory_num >= 60) list[i].memory_num = list[i].memory_num*0.6
         else if (list[i].memory_num < 60 && list[i].memory_num >= 30) list[i].memory_num = list[i].memory_num*0.4
              else  list[i].memory_num = list[i].memory_num*0.2
  }
  return list;
}
  //单词推荐
  //word表示许多（100个）带有记忆指数的单词数组，形式为[word,memory_num]
  //num表示推荐单词的数目
function recommend(word, num){
  var temp = []
  var num_kuai = Math.floor(word.length / num) //每块的单词数
  //单词排序
  function ascend(x,y){
    return x[1] - y[1];  //按照数组的第4个值升序排列
  }
  word.sort(ascend)
  for (var i = 0; i <= num_kuai * (num - 1); i += num_kuai){
    //将单词按照分块，在每块随机选出一个单词推荐给用户
    var index = Math.floor((Math.random() * num_kuai)) + i
    temp.push(word[index])
  }
  word = temp

  return word
}

//高效复习
//获取用户已经背过的单词
//word表示许多（100个）带有记忆指数的单词数组，形式为[word,memory_num] memory_num:{a:90,b:40}是对象
//num表示推荐单词的数目
function review(word,num){
  var temp1 = []
  var temp2 = []
  temp1 = word
  function ascend(x,y){
    return x[1] - y[1];  //按照数组的第4个值升序排列
  }
  temp1.sort(ascend)
  for (var i = 0;i < num;i++){
    temp2[i] = temp1[i]
  }
  word=temp2
  
  return word
}

//运行预测模型初始化单词
//word形式为[danci,yinbiao]
function init(word){

  var mat2 = []//参数矩阵
  for (var i in word) {
    var singleMat = []
    var word_len = word[i][0].length
    var word_char_count = new Set(word[i][0]).size
    var pronounce_len = word[i][1].length
    var pron_char_count = new Set(word[i][1]).size
    singleMat.push(word_len)
    singleMat.push(word_char_count)
    singleMat.push(pronounce_len)
    singleMat.push(pron_char_count)
    mat2.push(singleMat)
  }
  return mat2
}

var assert = require('assert')
// var expect = require('chai').expect;//固定参数

describe('MAGIC_WORD深度学习单词记忆软件单元测试', function () {
  describe('输入一个含记忆指数的对象列表处理后记忆指数发生不同程度的衰减', function () {
    it('输入记忆指数为60，30', function () {
      var list1=[{memory_num:60},{memory_num:30}]
      var list2=[{memory_num:36},{memory_num:12}]
      assert.deepEqual((forgettingCurve(list1)), list2)
    })
    it('输入记忆指数为0，100，96', function () {
      var list1=[{memory_num:0},{memory_num:100},{memory_num:95}]
      var list2=[{memory_num:0},{memory_num:80},{memory_num:76}]
      assert.deepEqual((forgettingCurve(list1)), list2)
    })
    it('输入记忆指数为45，15，68', function () {
      var list1=[{memory_num:45},{memory_num:15},{memory_num:68}]
      var list2=[{memory_num:18},{memory_num:3},{memory_num:40.8}]
      assert.deepEqual((forgettingCurve(list1)), list2)
    })
    it('输入记忆指数为67，87，56，98，3', function () {
      var list1=[{memory_num:67},{memory_num:87},{memory_num:56},{memory_num:98},{memory_num:3}]
      var list2=[{memory_num: 40.199999999999996},{memory_num:52.199999999999996},{memory_num:22.400000000000002},{memory_num: 78.4},{memory_num:0.6000000000000001}]
      assert.deepEqual((forgettingCurve(list1)), list2)
    })
  })
  describe('输入一个带有记忆指数的数组与用户学习新单词数之后输出相应记忆指数难度适中的单词数组', function () {
    it('输入第一组测试数据', function () {
      var list1=[['apple',70],['orange',39],['add',90],['pdd',53],['faker',93],['theshy',88],['rookie',99]]
      var num1 = 4
      var num2 = 4
      assert.equal((recommend(list1,num1)).length,num2)
      for (var i=0;i<num1;i++){
        assert.equal(recommend(list1,num1)[i][1]<=100 && recommend(list1,num1)[i][1]>=0,true)
      }
    })
    it('输入第二组测试数据', function () {
      var list1=[['ruler',64],['bdd',89],['jackeylove',91],['white',23],['knight',98],['shy',89],['looper',94],['caps',92]]
      var num1 = 5
      var num2 = 5
      assert.equal((recommend(list1,num1)).length,num2)
      for (var i=0;i<num1;i++){
        assert.equal(recommend(list1,num1)[i][1]<=100 && recommend(list1,num1)[i][1]>=0,true)
      }
    })
    it('输入第三组测试数据', function () {
      var list1=[['perks',90],['nanfeng',79],['puff',81],['uzi',95],['karsa',94],['yuyanjia',85],['three',3],['six',60],['nine',99.9999999999]]
      var num1 = 6
      var num2 = 6
      assert.equal((recommend(list1,num1)).length,num2)
      for (var i=0;i<num1;i++){
        assert.equal(recommend(list1,num1)[i][1]<=100 && recommend(list1,num1)[i][1]>=0,true)
      }
    })
  })
  describe('输入一个带有记忆指数的数组与用户复习单词数之后输出相应个数的记忆指数最低的几个单词数组', function () {
    it('输入第一组测试数据', function () {
      var list1=[['apple',70],['orange',39],['add',90],['pdd',53],['faker',93],['theshy',88],['rookie',99]]
      var num1 = 4
      var num2 = 4
      assert.equal(review(list1,num1).length,num2)
      assert.equal(review(list1,num1)[0][1], 39)
      for (var i = 0; i < num1-1; i++){
        assert.equal(review(list1,num1)[i][1] <= review(list1,num1)[i+1][1], true)
      }
      for (var i=0;i<num1;i++){
        assert.equal(review(list1,num1)[i][1]<=100 && review(list1,num1)[i][1]>=0,true)
      }
    })
    it('输入第二组测试数据', function () {
      var list1=[['ruler',64],['bdd',89],['jackeylove',91],['white',23],['knight',98],['shy',89],['looper',94],['caps',92]]
      var num1 = 5
      var num2 = 5
      assert.equal(review(list1,num1).length,num2)
      assert.equal(review(list1,num1)[0][1], 23)
      for (var i = 0; i < num1-1; i++){
        assert.equal(review(list1,num1)[i][1] <= review(list1,num1)[i+1][1], true)
      }
      for (var i=0;i<num1;i++){
        assert.equal(review(list1,num1)[i][1]<=100 && review(list1,num1)[i][1]>=0,true)
      }
    })
    it('输入第三组测试数据', function () {
      var list1=[['perks',90],['nanfeng',79],['puff',81],['uzi',95],['karsa',94],['yuyanjia',85],['three',3],['six',60],['nine',99.9999999999]]
      var num1 = 6
      var num2 = 6
      assert.equal(review(list1,num1).length,num2)
      assert.equal(review(list1,num1)[0][1], 3)
      for (var i = 0; i < num1-1; i++){
        assert.equal(review(list1,num1)[i][1] <= review(list1,num1)[i+1][1], true)
      }
      for (var i=0;i<num1;i++){
        assert.equal(review(list1,num1)[i][1]<=100 && review(list1,num1)[i][1]>=0,true)
      }
    })
  })
  describe('输入一个带有带有单词和音标的数组，输出单词的4项基本属性', function () {
    it('输入单词为face,warehouse,exclusively,distinct,character', function () {
      var list1=[['face','feɪs'], ['warehouse','werhaʊs'],['exclusively','ɪkskluːsɪvli'],['distinct','dɪstɪŋkt'],['character','kerəktər']]
      var list2=[[4,4,4,4],[9,8,7,7],[11,9,12,8],[8,6,8,6],[9,6,8,5]]
      assert.deepEqual(init(list1),list2)
    })
    it('输入单词为abandon，abnormal', function () {
      var list1=[["abandon",'əbændən'], ['abnormal','æbnɒrml']]
      var list2=[[7,5,7,5],[8,7,7,7]]
      assert.deepEqual(init(list1),list2)
    })
    it('输入单词为layman，layout,cause', function () {
      var list1=[["layman",'leɪmənn'], ['layout','leɪaʊt'],['cause','kɔz']]
      var list2=[[6,5,7,6],[6,6,6,6],[5,5,3,3]]
      assert.deepEqual(init(list1),list2)
    })
    it('输入单词为ash', function () {
      var list1=[["ash",'æʃ']]
      var list2=[[3,3,2,2]]
      assert.deepEqual(init(list1),list2)
    })
  })
  describe('记忆指数调整模型：输入单词背诵和测试的记录张量得到每次学习后记忆指数增量', function () {
    it('输入第一组测试数据', async () => {
      let r = await loadModel1([[2,2,1,3,2,2],[1,2,2,1,1,1]]);
      var list=[];
      for(var i = 0; i<r.length; ++i){
        list.push(r[i]);
      }
      assert.deepEqual(list, [155.28932189941406,94.37312316894531]);
    });
  })
  describe('预测模型：输入单词属性张量得到初始记忆指数', function () {
    it('输入单词face,warehouse,exclusively,distinct,character的属性张量', async () => {
      let r = await loadModel2([[4,4,4,4],[9,8,7,7],[11,9,12,8],[8,6,8,6],[9,6,8,5]]);
      var list=[];
      for(var i = 0; i<r.length; ++i){
        list.push(r[i]);
      }
      assert.deepEqual(list, [44.67424011230469,30.27725601196289,13.021135330200195,24.18756103515625,15.337182998657227]);
    });
    it('输入单词abandon，abnormal的属性张量', async () => {
      let r = await loadModel2([[7,5,7,5],[8,7,7,7]]);
      var list=[];
      for(var i = 0; i<r.length; ++i){
        list.push(r[i]);
      }
      assert.deepEqual(list, [26.5393123626709,34.356422424316406]);
    });
    it('输入单词layman，layout,cause的属性张量', async () => {
      let r = await loadModel2([[6,5,7,6],[6,6,6,6],[5,5,3,3]]);
      var list=[];
      for(var i = 0; i<r.length; ++i){
        list.push(r[i]);
      }
      assert.deepEqual(list, [38.97578048706055,40.959842681884766,39.577667236328125]);
    });
    it('输入单词ash的属性张量', async () => {
      let r = await loadModel2([[3,3,2,2]]);
      var list=[];
      for(var i = 0; i<r.length; ++i){
        list.push(r[i]);
      }
      assert.deepEqual(list, [42.39606475830078,]);
    });
  })
  
})