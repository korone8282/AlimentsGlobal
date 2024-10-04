const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    pDate:{
        type: Date,
        // default:Date.now(),
    },
    name:{
        type: String,
        required : true,
    },
    unit:{
        type: String,
        required : true,
    },
    stock:{
        type: Number,
        required : true,
    },
    rate:{
        type: Number,
        required : true,
    },
    quant:{
        type: Number,
    },
    equipment:{
        type: String,
    },
    section:{
        type: String,
    },
    lDate:{
        type: Date,
    },
})

module.exports = mongoose.model('Inventory',inventorySchema);