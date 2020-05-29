// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud-14ij5'
})

// 云函数入口函数
exports.main = async (event, context) => {

  var res = await cloud.callFunction({

    name: 'get_collection'

  })

  let myusers = res.result.data
  let counter = myusers.length
  let counter_cet6 = 0
  let counter_gaokao = 0
  let counter_gre = 0
  let counter_toefl = 0

  var i = myusers[0].sum_time

  counter_cet6 = Object.keys(myusers[i].cet6).length
  counter_gaokao = Object.keys(myusers[i].gaokao).length
  counter_toefl = Object.keys(myusers[i].toefl).length
  counter_gre = Object.keys(myusers[i].gre).length

  //*****************************User表更新完毕，现在需要更新的是各个dic表 ************************//
  userx = myusers[i]._id
  if (counter_cet6 != 0) {
    dic = "cet6"
    for (var k in myusers[i].cet6) {
      myword = k
      m_n = myusers[i].cet6[k]

      res = await cloud.callFunction({

        name: 'fgt_cet6',
        data: {
          _userx: userx,
          _word: myword,
          _memory_num: m_n
        },
        success(res) {
          console.log("更新词库cet6词汇", myword, "成功")
        },
        fail(res) {
          console.log("更新词库cet6词汇", myword, "失败")
        }
      })

    }
  }

  if (counter_gre != 0) {
    dic = "gre"
    for (var k in myusers[i].gre) {
      myword = k
      m_n = myusers[i].gre[k]

      res = await cloud.callFunction({

        name: 'fgt_gre',
        data: {
          _userx: userx,
          _word: myword,
          _memory_num: m_n
        },
        success(res) {
          console.log("更新词库gre词汇", myword, "成功")
        },
        fail(res) {
          console.log("更新词库gre词汇", myword, "失败")
        }
      })

    }
  }

  if (counter_toefl != 0) {
    dic = "toefl"
    for (var k in myusers[i].toefl) {
      myword = k
      m_n = myusers[i].toefl[k]

      res = await cloud.callFunction({

        name: 'fgt_toefl',
        data: {
          _userx: userx,
          _word: myword,
          _memory_num: m_n
        },
        success(res) {
          console.log("更新词库toefl词汇", myword, "成功")
        },
        fail(res) {
          console.log("更新词库toefl词汇", myword, "失败")
        }
      })

    }
  }

  if (counter_gaokao != 0) {
    dic = "gaokao"
    for (var k in myusers[i].gaokao) {
      myword = k
      m_n = myusers[i].gaokao[k]

      res = await cloud.callFunction({

        name: 'fgt_gaokao',
        data: {
          _userx: userx,
          _word: myword,
          _memory_num: m_n
        },
        success(res) {
          console.log("更新词库gaokao词汇", myword, "成功")
        },
        fail(res) {
          console.log("更新词库gaokao词汇", myword, "失败")
        }
      })

    }
  }

  //**********************************更新id为1的sum_time***************************************//

  var inc_time = 0
  if (i != counter - 1) {
    inc_time = ((i + 1) % counter - i) * 1
  }
  else {
    inc_time = 2 - counter
  }

  res = await cloud.callFunction({

    name: 'time_inc',
    data: {
      _inc_time: inc_time,
      _id: "1"
    },
    success(res) {
      console.log("更新Users序列号", (i + 1) % counter, "成功")
    },
    fail(res) {
      console.log("更新Users序列号", (i + 1) % counter, "失败")
    }
  })

  return res.result
}