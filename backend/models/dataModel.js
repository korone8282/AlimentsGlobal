const mongoose = require('mongoose');
const mailSender = require('../utils/nodeMailer');

const dataSchema = new mongoose.Schema({
       sectionMain:{
            type: String,
            required : true
        },
        dayTime:{
            type: String,
            default: "Day",
        },
        dataList:[{
        section:{
            type: String,
            required : true
        },
        batch:{
            type: String,
            required : true
        },
        buyer:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Category",
        },
        buyerName:{
            type: String,
            required:true,
        },
        productName:{
            type: String,
            required:true,
        },
        batchQuantity:{
            type: Number,
        },
        batchSize:{
            type: Number,
        },
        yield:{
            type: Number,
        },
        yieldLoss:{
            type: Number,
        },
        workersQuantity:{
            type: Number,
            required:true,
        },
        retortCycle:{
            type: Number,
        },
        pouchPerCycle:{
            type: Number,
        },
        empty:{
            type: Number,
        },
        filled:{
            type: Number,
        },
        pouchPacked:{
            type: Number,
        },
        box:{
            type: Number,
        },
        packSize:{
            type: Number,
        },
        pouchQuantity:{
            type: Number,
        },
        pouchLoss:{
            type: Number,
        },
        leaked:{
            type: Number,
        },
        foreignMatter:{
            type: Number,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

// async function sendMail(){
// try {
//    await mailSender("korone8282@gmail.com","Daily data for Aliments Global has been uploaded","");
// } catch (error) {
//     console.log("error while sending mail",error);
//     throw new error;
// }
// }

// dataSchema.post("save", async function(){
//     await sendMail();
// });


module.exports =  mongoose.model('Data',dataSchema)