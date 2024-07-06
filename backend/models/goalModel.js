const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
        fname:{
            type: String,
            required:true,
        },
        batchNum:{
            type: String,
            required:true,
        },
        pouchSize:{
            type: Number,
            required:true,
        },
        pouchGoal:{
            type: Number,
            required:true,
        },
        pouchPacked:{
            type: Number,
            required:true,
        },
        date: {
            type: Date
        },
        createdAt: {
            type: Date,
        },
})

module.exports =  mongoose.model('Goal',goalSchema);

