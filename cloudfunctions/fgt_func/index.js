// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud-14ij5'
})

// 云函数入口函数

exports.main = async (event, context) => {


  const res = await cloud.callFunction({

    name: 'get_collection'

  })

  let myusers = res.result.data
  let counter = myusers.length
  let counter_cet6 = 0
  let counter_gaokao = 0
  let counter_gre = 0
  let counter_toefl = 0

  //*********************修改用户i的所有单词的记忆指数********************************//
  for (var i = 0; i < counter; ++i) {
    counter_cet6 = Object.keys(myusers[i].cet6).length
    counter_gaokao = Object.keys(myusers[i].gaokao).length
    counter_toefl = Object.keys(myusers[i].toefl).length
    counter_gre = Object.keys(myusers[i].gre).length

    if (counter_cet6 != 0) {
      for (var k in myusers[i].cet6) {
        if (myusers[i].cet6[k] >= 90) {
          myusers[i].cet6[k] *= 0.9
        }
        else if (myusers[i].cet6[k] >= 70) {
          myusers[i].cet6[k] *= 0.7
        }
        else if (myusers[i].cet6[k] >= 50) {
          myusers[i].cet6[k] *= 0.5
        }
        else {
          myusers[i].cet6[k] *= 0.3
        }

      }
    }
    if (counter_gaokao != 0) {
      for (var k in myusers[i].gaokao) {
        if (myusers[i].gaokao[k] >= 90) {
          myusers[i].gaokao[k] *= 0.9
        }
        else if (myusers[i].gaokao[k] >= 70) {
          myusers[i].gaokao[k] *= 0.7
        }
        else if (myusers[i].gaokao[k] >= 50) {
          myusers[i].gaokao[k] *= 0.5
        }
        else {
          myusers[i].gaokao[k] *= 0.3
        }

      }
    }
    if (counter_gre != 0) {
      for (var k in myusers[i].gre) {
        if (myusers[i].gre[k] >= 90) {
          myusers[i].gre[k] *= 0.9
        }
        else if (myusers[i].gre[k] >= 70) {
          myusers[i].gre[k] *= 0.7
        }
        else if (myusers[i].gre[k] >= 50) {
          myusers[i].gre[k] *= 0.5
        }
        else {
          myusers[i].gre[k] *= 0.3
        }

      }
    }
    if (counter_toefl != 0) {
      for (var k in myusers[i].toefl) {
        if (myusers[i].toefl[k] >= 90) {
          myusers[i].toefl[k] *= 0.9
        }
        else if (myusers[i].toefl[k] >= 70) {
          myusers[i].toefl[k] *= 0.7
        }
        else if (myusers[i].toefl[k] >= 50) {
          myusers[i].toefl[k] *= 0.5
        }
        else {
          myusers[i].toefl[k] *= 0.3
        }

      }
    }


  }

  //************ 用户记忆指数全部本地修改完毕，可以先向Users表中提交修改申请 **************************//
  var myword = ""
  var userx = ""
  var m_n = 0
  var dic = ""

  for (var i = 0; i < counter; ++i) {

    userx = myusers[i]._id

    if (counter_cet6 != 0) {
      dic = "cet6"
      for (var k in myusers[i].cet6) {
        myword = k
        m_n = myusers[i].cet6[k]

        const res = await cloud.callFunction({

          name: 'Users_Mry',
          data: {
            _openid: userx,
            _word: myword,
            _memory_num: m_n,
            _dic: dic
          },
          success(res) {
            console.log("Users自动更新cet6词汇", myword, "成功")
          },
          fail(res) {
            console.log("Users自动更新cet6词汇", myword, "失败")
          }
        })

      }
    }

    if (counter_gre != 0) {
      dic = "gre"
      for (var k in myusers[i].gre) {
        myword = k
        m_n = myusers[i].gre[k]

        const res = await cloud.callFunction({

          name: 'Users_Mry',
          data: {
            _openid: userx,
            _word: myword,
            _memory_num: m_n,
            _dic: dic
          },
          success(res) {
            console.log("Users自动更新gre词汇", myword, "成功")
          },
          fail(res) {
            console.log("Users自动更新gre词汇", myword, "失败")
          }
        })

      }
    }

    if (counter_toefl != 0) {
      dic = "toefl"
      for (var k in myusers[i].toefl) {
        myword = k
        m_n = myusers[i].toefl[k]

        const res = await cloud.callFunction({

          name: 'Users_Mry',
          data: {
            _openid: userx,
            _word: myword,
            _memory_num: m_n,
            _dic: dic
          },
          success(res) {
            console.log("Users自动更新toefl词汇", myword, "成功")
          },
          fail(res) {
            console.log("Users自动更新toefl词汇", myword, "失败")
          }
        })

      }
    }

    if (counter_gaokao != 0) {
      dic = "gaokao"
      for (var k in myusers[i].gaokao) {
        myword = k
        m_n = myusers[i].gaokao[k]

        const res = await cloud.callFunction({

          name: 'Users_Mry',
          data: {
            _openid: userx,
            _word: myword,
            _memory_num: m_n,
            _dic: dic
          },
          success(res) {
            console.log("Users自动更新gaokao词汇", myword, "成功")
          },
          fail(res) {
            console.log("Users自动更新gaokao词汇", myword, "失败")
          }
        })

      }
    }


  }
  //*****************************User表更新完毕，现在需要更新的是各个dic表 ************************//

  for (var i = 0; i < counter; ++i) {
    userx = myusers[i]._id
    if (counter_cet6 != 0) {
      dic = "cet6"
      for (var k in myusers[i].cet6) {
        myword = k
        m_n = myusers[i].cet6[k]

        const res = await cloud.callFunction({

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

        const res = await cloud.callFunction({

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

        const res = await cloud.callFunction({

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

        const res = await cloud.callFunction({

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


  }

  console.log("我的用户", myusers)

  return res.result
}