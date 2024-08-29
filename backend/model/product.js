const mongoose = require('mongoose')

const useschame = mongoose.Schema({
    name:String,
    price:String,
    discount:String,
    url:String,
    color:String,
    text:String,
    panelcolor:String
})
module.exports = mongoose.model('product',useschame)
