const mongoose = require('mongoose');

const utilitySchema = new mongoose.Schema({
    BoilerRh:{
        type: Number,
    },
    BoilerCN:{
        type: String,
    },
    BoilerSD:{
        type: String,
    },
    BoilerAD:{
        type: String,
    },
    BoilerBD:{
        type: String,
    },
    BoilerR:{
        type: String,
    },
    RoRh:{
        type: Number,
    },
    RoCN:{
        type: String,
    },
    RoSD:{
        type: String,
    },
    RoAD:{
        type: String,
    },
    RoBD:{
        type: String,
    },
    RoR:{
        type: String,
    },
    EtpRh:{
        type: Number,
    },
    EtpCN:{
        type: String,
    },
    EtpSD:{
        type: String,
    },
    EtpAD:{
        type: String,
    },
    EtpBD:{
        type: String,
    },
    EtpR:{
        type: String,
    },
    DGRh:{
        type: Number,
    },
    Cylinder:{
        type: Number,
    },
    Diesel:{
        type: Number,
    },
createdAt: {
    type: Date,
    default: Date.now(),
},
})

module.exports = mongoose.model('Utility',utilitySchema);