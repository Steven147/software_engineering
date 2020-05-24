// 云函数入口文件
const cloud = require('wx-server-sdk')

// 云函数入口文件
cloud.init({
  env: 'cloud-14ij5'
})

// 云函数入口函数
exports.main = async (event, context) => {
  let word1 = event._word
  return await cloud.database().collection("gaokao").where({
    word: word1
  }).get()
}
