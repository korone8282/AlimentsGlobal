const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    buyer:{
        type: String,
        required : true,
    },
    name:{
        type: String,
        required : true,
        unique:true,
    },
})

module.exports = mongoose.model('Product',productSchema); 