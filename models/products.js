const mongoose = require("mongoose");

let products = mongoose.Schema({
    productName:String,
    prodcutImage:String,
    price:String

})
module.exports = mongoose.model('products',products)