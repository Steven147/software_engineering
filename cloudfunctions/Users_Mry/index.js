// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud-14ij5'
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  let openid = event._openid;
  let m_n = event._memory_num;
  let word = event._word;
  let dic = event._dic;
  if (dic == "gre"){
    var gre = {};
    gre[word] = m_n * 1;
    try {
      return await db.collection("Users").doc(openid).update({
        data: {
          gre
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
  else if(dic == "cet6"){
    var cet6 = {};
    cet6[word] = m_n * 1;
    try {
      return await db.collection("Users").doc(openid).update({
        data: {
          cet6
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
  else if(dic == "toefl"){
    var toefl = {};
    toefl[word] = m_n * 1;
    try {
      return await db.collection("Users").doc(openid).update({
        data: {
          toefl
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
  else if (dic == "gaokao"){
    var gaokao = {};
    gaokao[word] = m_n * 1;
    try {
      return await db.collection("Users").doc(openid).update({
        data: {
          gaokao
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
}