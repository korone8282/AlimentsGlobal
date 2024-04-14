require("dotenv").config();
const Data = require('../models/dataModel');

exports.createData = async(req,res) => {
try {

    const {section} = req.params;

    const dataItems = req.body;
    
     if(!dataItems){
        res.status(400).json({
            success:false,
            data:"no data found"

        })
     }

    const newData = await Data.create({
        sectionMain: section,
        dataList: dataItems,
    })

    res.status(200).json({
        success:true,
        data:newData,
        message:"Data created"
    });


} catch (error) {
    console.log(error);
    res.status(400).json({
        message:error
    })
}
}

exports.readData = async(req,res) => {
    try {
    
        const {date,month} = req.params;
        
        const start = new Date(`2024-${month}-${date}`);
        start.setHours(0, 0, 0, 0);
        const end = new Date(`2024-${month}-${date}`);
        end.setHours(23, 59, 59, 999);

        const existData = await Data.find({createdAt:{
            $gte:start,
            $lte:end
        }});

            if(!existData.length){
             return res.status(404).json({
             message:"data doesn't exists",
             })
        }
                    
         res.status(200).json({
            success:true,
            data:existData,
        })
                
        } catch (error) {
            console.log(error);
            res.status(400).json({
             message:error
        })
                }
         }

exports.deleteData = async(req,res)=>{
    try {
        const data = await Data.findById(req.params.id);

        if(!data){
            res.status(404).json({
                success:false,
                data:"no product exists",
            }); 
            return;
        }
        
        await Data.findOneAndDelete({_id:req.params.id});

        
        res.status(200).json({
            success:true,
            message:"data successfully deleted",
        })

    } catch (error) {
    console.log(error);
        res.status(500).json({
            success:false,
            data:error,
    });
    }
}

exports.readBuyerData = async(req,res) => {
    try {

        const {start,end,buyer} = req.body;

        const startDate = new Date(start);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(end);
        endDate.setHours(23, 59, 59, 999);

        const existData = await Data.find({createdAt:{
            $gte:startDate,
            $lte:endDate
        },dataList:{ $elemMatch: { buyerName:buyer } } });

            if(!existData.length){
             return res.status(404).json({
             message:"data doesn't exists",
             })
        }
                 
         res.status(200).json({
            success:true,
            data:existData,
        })
                
        } catch (error) {
            console.log(error);
            res.status(400).json({
             message:error
        })
                }
         }