// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"cloud-14ij5"
})

// 云函数入口函数
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  let word4 = event._word;
  return cloud.database().collection("toefl").where({
    memory_num: {
      夏里宾: _.neq(null)
    }
  })
  .get(/*{
    success(res){
      return res
    },
    fail(err){
      return err
    }
  }*/)
}