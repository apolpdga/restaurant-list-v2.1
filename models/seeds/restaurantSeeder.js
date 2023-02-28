//引入 dotenv，讓 Node.js 能抓到寫在 .env 上的環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant.js') // 載入 Restaurant model 設定
const restaurantList = require("../../restaurant.json").results // 載入 Restaurant 資料
const db = require('../../config/mongoose')// Mongoose 連線

//一旦連上mongoDB，即建置種子資料
db.once('open', () => {
  console.log("running restaurantSeeder script...")

  Restaurant
    .create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
})