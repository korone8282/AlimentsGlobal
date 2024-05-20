const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    buyer:{
        type: String,
        required : true,
    },
    name:{
        type: String,
        required : true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('Product',productSchema); 