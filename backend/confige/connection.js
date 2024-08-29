const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/firstwebsite').then(function () {
    console.log('connection');
}).catch(function () {
    console.log('some error');
})

module.exports = mongoose.connection