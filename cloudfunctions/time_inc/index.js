
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud-14ij5'
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  //let inc_time = 11*1;
  //let id = 2;
  
  let inc_time = event._inc_time*1;
  let id =event._id;
  try {
    return await db.collection("Users").doc(id).update({
      data: {
        sum_time:_.inc(inc_time)
      }
    })
  } catch (e) {
    console.error(e)
  }

}