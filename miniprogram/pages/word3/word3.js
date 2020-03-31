const DB = wx.cloud.database().collection("list")
//let name=""
//let age=""
let id = ""
let memory_num = ""

Page({


  //待修改id
  updid(event) {
    id = event.detail.value
    //console.log(event)
  },

  //待修改memory_num
  updm_n(event) {
    memory_num = event.detail.value
    console.log(event)
  },

  //修改记忆指数
  updData() {
    wx.cloud.callFunction({
      name: "updlist",
      data: {
        _id: id,
        _memory_num: memory_num
      },
      success(res) {
        console.log("修改成功", res)
      },
      fail(res) {
        console.log("修改失败", res)
      }
    })

    wx.redirectTo({
      url: '../tst/tst',
    })
  },


  data: {
    datalist: []
  },

  //进入数据处理界面
  goDataprocessing() {
    wx.navigateTo({
      url: '../getData/getData',
    })
  },


  //获取单词数据
  getlist() {

    let that = this

    wx.cloud.database().collection("list").get({

      success(res) {
        console.log("获取成功", res)

        that.setData({
          datalist: res.data
        })
      },
      fail(res) {
        console.log("获取失败", res)
      }

    })


  }

})

