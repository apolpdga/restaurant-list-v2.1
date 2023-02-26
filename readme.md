### 功能
#### 新增餐廳
#### 瀏覽所有餐廳
#### 查看餐廳詳細資訊
#### 搜尋餐廳
#### 修改餐廳資訊
#### 刪除餐廳

### 開始使用
#### 1. 請先確認本地端有安裝 Node.js 及 npm
#### 2. 開啟終端機(Terminal)，cd 到存放專案本機位置，執行 git clone https://github.com/apolpdga/restaurant-list-v2.0.git
#### 3. cd restaurant-list-v2.0 以切換至專案資料夾
#### 4. 安裝需要的套件
#### 5. 安裝完成後，於專案資料夾下新增.eve檔案，並於其中加入以下資料：MongoDBMONGODB_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/<Your MongoDB Table>?retryWrites=true&w=majority
#### 6. 執行專案: npm run start
#### 若出現此訊息表示執行順利，在瀏覽器輸入以下網址開始使用
App is running on http://localhost:3000 mongodb connected!

#### 如果要暫停使用，請在終端機輸入 ctrl + c，再關閉瀏覽器 
#### 如有需要生成種子資料請輸入以下指令: npm run seed

### 開發工具
#### Node.js ^14.16.0
#### Nodemon
#### Express ^4.18.2
#### Express-handlebars ^3.0.0
#### MongoDB
#### mongoose ^5.13.15
#### dotenv ^16.0.3
#### method-override ^3.0.0
#### Bootstrap v5.13
#### Font-awesome