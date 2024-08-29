const express = require('express')
const app = express();
const mongodb = require('./confige/connection');
// const cookieParser = require('cookie-parser');
const cors = require('cors')
const use = require('./router/user')
// const product = require('./router/product')
const admin = require('./router/admin')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser)
app.use(cors())
app.get('/', function (req, res) {
    res.send('is working')
})
app.use('/user', use)
// app.use('/product', product)
app.use('/admin', admin)
app.listen(3000)