// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud-14ij5'
})

// 云函数入口函数
const db = cloud.database()
const _ = db.command
// 云函数入口函数
//参数包括：
//单词id号：id
//记忆指数：m_n
//用户序列号：userx
exports.main = async (event, context) => {
  let id = event._id;
  let m_n = event._memory_num;
  let userx = event._userx;
  var memory_num = {};
  memory_num[userx] = m_n * 1;
  try {
    return await db.collection("6").doc(id).update({
      data: {
        memory_num
      }
    })
  } catch (e) {
    console.error(e)
  }

}