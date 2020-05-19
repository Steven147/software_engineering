// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'vocabulary-c2vko'
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  let openid = event._openid;
  let m_n = event._memory_num;
  let word = event._word;
  var gre_mry = {};
  gre_mry[word] = m_n * 1;
  try {
    return await db.collection("Users").doc(openid).update({
      data: {
        gre_mry
      }
    })
  } catch (e) {
    console.error(e)
  }

}