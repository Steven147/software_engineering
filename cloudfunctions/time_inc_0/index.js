
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud-14ij5'
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  

  
  try {
    return await db.collection("Users").doc("1").update({
      data: {
        sum_time: _.inc(1)
      }
    })
  } catch (e) {
    console.error(e)
  }

}