const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud-14ij5'
})
const db = cloud.database()
exports.main = async (event, context) => {
  let userx=event._userx;
  let obj={};
  let sum_time=0*1;
  
  try {
    return await db.collection('Users').add({
      data: {
        "_id":userx,
        "6_mry":obj,
        "gaokao_mry":obj,
        "gre_mry":obj,
        "toefl_mry":obj,
        "sum_time":sum_time,
      }
    })
  } catch (e) {
    console.error(e)
  }
  console.log("chenggong")
}