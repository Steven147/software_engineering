// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud-14ij5'
})

// 云函数入口函数

exports.main = async (event, context) => {

  let userx = event._userx;
  let str = "memory_num." + userx;
  return cloud.database().collection('toefl').orderBy(str, 'desc').get();
}
