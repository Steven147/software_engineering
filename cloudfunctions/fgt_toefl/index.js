// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud-14ij5'
})

// 云函数入口函数
exports.main = async (event, context) => {
  let myword = event._word
  let userx = event._userx
  let m_n = event._memory_num

  var memory_num = {}
  memory_num[userx] = m_n
  return await db.collection('toefl').where({
    word: myword
  })
    .update({
      data: {
        memory_num
      }
    })

}