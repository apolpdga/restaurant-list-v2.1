// 1. 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 2. 引用 Todo model
const Restaurant = require('../../models/restaurant')

// 3. 定義/restaurants下的所有路由
//新增資料
//渲染new頁面
router.get('/new', (req, res) => {
  res.render("new")
})
// 新增資料，並導回detail頁
router.post('/', (req, res) => {
  Restaurant.create(req.body)     // 回傳資料新增至資料庫
    .then(() => res.redirect('/'))    // 新增完成後導回首頁
    .catch(error => console.log(error))
  // 使用then時需要返回一個結果，而當使用 arrow function, 例如() => x 其實就是() => { return x; }，故會返回結果
})

//餐廳detail資料
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => { res.render('detail', { restaurant }) })
    .catch(error => console.log(error))
})

//修改資料
//渲染edit頁面
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => {
      res.render('edit', { restaurant })
    })
    .catch(error => console.log(error))
})
//edit資料，並導回detail頁
router.post('/:restaurant_id/edit', (req, res) => {
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
router.post('/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 4. 匯出路由模組
module.exports = router