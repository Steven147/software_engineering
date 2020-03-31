// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud-14ij5'
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let id = event._id;
  let memory_num = event._memory_num;
  try {
    return await db.collection("list").doc(id).update({
      data: {
        memory_num: memory_num
      }
    })
  } catch (e) {
    console.error(e)
  }

}