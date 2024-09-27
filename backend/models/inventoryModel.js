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
    },
    stock:{
        type: Number,
        required : true,
    },
    rate:{
        type: Number,
    },
    quant:{
        type: Number,
    },
    equipment:{
        type: String,
    },
    lDate:{
        type: Date,
    },
})

module.exports = mongoose.model('Inventory',inventorySchema);