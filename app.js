// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()

// start and listen on the Express server
const port = 3000
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})

//引入 dotenv，讓 Node.js 能抓到寫在 .env 上的環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//樣版引擎
const exphbs = require('express-handlebars') //載入樣版引擎handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) //定義要使用的樣板引擎
app.set('view engine', 'handlebars') //設定 view engine 是 handlebars

// setting static files
// 告訴 Express 靜態檔案放在public資料夾，它不必針對這個資料夾內的檔案做什麼，只要產生對應的路由讓我們可以使用就好
app.use(express.static('public'))

//Restaurant model
const db = require('./config/mongoose.js') // Mongoose 連線
const Restaurant = require('./models/restaurant.js') // 載入 Restaurant model 設定


// 路由設定

// 使用 body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// 載入 method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method')) //將每筆路由使用 methodOverride 進行前置處理

// 引用路由器
const routes = require('./routes/index.js')
app.use(routes)

