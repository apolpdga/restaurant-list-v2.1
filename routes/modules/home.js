// 1. 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 2. 引用 restaurant model
const Restaurant = require('../../models/restaurant.js')

// 3. 定義首頁路由
//瀏覽全部餐廳
router.get("/", (req, res) => {
  Restaurant.find({})
    .lean()
    .then(restaurantsData => res.render("index", { restaurantsData }))
    .catch(err => console.log(err))
})
//搜尋
router.get('/search', (req, res) => {
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
//排序
router.get('/sort', (req, res) => {
  const sort = req.query.sort
  if (sort === '1') {
    Restaurant
      .find({})
      .lean()
      .sort({ name: 'asc' })
      .then(restaurantsData => res.render("index", { restaurantsData }))
      .catch(err => console.log(err))
  }
  if (sort === '2') {
    Restaurant
      .find({})
      .lean()
      .sort({ name: 'desc' })
      .then(restaurantsData => res.render("index", { restaurantsData }))
      .catch(err => console.log(err))
  }
  if (sort === '3') {
    Restaurant
      .find({})
      .lean()
      .sort({ category: 'asc' })
      .then(restaurantsData => res.render("index", { restaurantsData }))
      .catch(err => console.log(err))
  }
  if (sort === '4') {
    Restaurant
      .find({})
      .lean()
      .sort({ location: 'asc' })
      .then(restaurantsData => res.render("index", { restaurantsData }))
      .catch(err => console.log(err))
  }

})
// 4. 匯出路由模組
module.exports = router