// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()

//引入 dotenv，讓 Node.js 能抓到寫在 .env 上的環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//載入 mongoose 並且設定連線
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態並儲存到 db 這個物件
const db = mongoose.connection
// 連線異常
// 用 on 註冊一個事件監聽器，用來監聽 error 事件有沒有發生，
// 只要有觸發 error 就印出 error 訊息
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
// 用once註冊了一個事件監聽器，監聽連線成功的 open 情況，
// 相對於「錯誤」，連線成功只會發生一次，所以這裡特地使用 once，
// 由於 once 設定的監聽器是一次性的，一旦連線成功，在執行 callback 以後就會解除監聽器)
db.once('open', () => {
  console.log('mongodb connected!')
})

//樣版引擎
const exphbs = require('express-handlebars') //載入樣版引擎handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) //定義要使用的樣板引擎
app.set('view engine', 'handlebars') //設定 view engine 是 handlebars

// setting static files
//告訴 Express 靜態檔案放在public資料夾，它不必針對這個資料夾內的檔案做什麼，只要產生對應的路由讓我們可以使用就好
app.use(express.static('public'))

//Restaurant model
const Restaurant = require('./models/restaurant') // 載入 Restaurant model


//路由設定
// 引用 body-parser
const bodyParser = require('body-parser')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//新增資料
//渲染new頁面
app.get('/restaurants/new', (req, res) => {
  res.render("new")
})

// 新增資料，並導回detail頁
app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)     // 回傳資料新增至資料庫
    .then(() => res.redirect('/'))    // 新增完成後導回首頁
    .catch(error => console.log(error))
  // 使用then時需要返回一個結果，而當使用 arrow function, 例如() => x 其實就是() => { return x; }，故會返回結果
})

//瀏覽全部餐廳
app.get("/", (req, res) => {
  Restaurant.find({})
    .lean()
    .then(restaurantsData => res.render("index", { restaurantsData }))
    .catch(err => console.log(err))
})

//搜尋
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase() //要搜尋的字串
  Restaurant
    .find({})
    .lean()
    .then(restaurantsData => {
      const filterRestaurantsData = restaurantsData.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", { restaurantsData: filterRestaurantsData, keyword })
    })
    .catch(err => console.log(err))
})

//餐廳detail資料
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => { res.render('detail', { restaurant }) })
    .catch(error => console.log(error))
})

//修改資料
//渲染edit頁面
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => {
      res.render('edit', { restaurant })
    })
    .catch(error => console.log(error))
})
//edit資料，並導回detail頁
app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  const { name, name_en, category, image, location, phone, google_map, rating, description, } = req.body
  console.log(req.body)
  // 「解構賦值(destructuring assignment)」:把物件裡的屬性一項項拿出來存成變數時，可以使用的一種縮寫
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//刪除資料
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})

