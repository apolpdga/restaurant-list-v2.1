// mongoose 載入進來，才能使用相關方法
const mongoose = require('mongoose')

//Mongoose 提供了一個 mongoose.Schema 模組
const Schema = mongoose.Schema

// Schema 大寫表示你可以用 new Schema() 的方式來建構一個新的 Schema
const restaurantSchema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  google_map: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
})

//透過 module.exports 輸出
//mongoose.model 會複製我們定義的 Schema 並編譯成一個可供操作的 model 物件，
//匯出的時候我們把這份 model 命名為 Restaurant，以後在其他的檔案直接使用 Restaurant 就可以操作相關資料
module.exports = mongoose.model("Restaurant", restaurantSchema)