// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'vocabulary-c2vko'
})

// 云函数入口函数

exports.main = async (event, context) => {

  let userx = event._userx;
  try{
    return await cloud.database().collection('Users').where({
      _id: userx
    }).get()
  }catch(e){
    console.error(e)
  }
  
}
