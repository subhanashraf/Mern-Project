const mongoose = require('mongoose')

const useschame = mongoose.Schema({
    name:String,
    email:String,
    password:String,
})
module.exports = mongoose.model('user',useschame)
