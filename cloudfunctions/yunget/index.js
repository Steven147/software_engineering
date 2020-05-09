// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"cloud-14ij5"
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("super").get({
    success(res){
      return res
    },
    fail(err){
      return err
    }
  })
}