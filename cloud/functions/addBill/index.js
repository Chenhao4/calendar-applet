// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const bill = db.collection('bill')
  
  bill.add({
    data: {
      money: event.money,
      description: event.description,
      date: db.serverDate()
    }
  })
  .then(res => {
    console.log('addBill inside', res)              
  })

  const result = await bill.where({description: '餐饮/食物'}).get()
    .then(res => {
      return {
        code: 0,
        data: res.data
      }
    })

  return {
    result
  }
}