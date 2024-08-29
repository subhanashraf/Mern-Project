const mongoose = require('mongoose')

const useschame = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    tellsomething:String,
})
module.exports = mongoose.model('admin',useschame)
