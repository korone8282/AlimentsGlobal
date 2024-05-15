require("dotenv").config();
const Utility = require('../models/utilityModel');

exports.createUtilData = async(req,res) => {
try {
    const data = req.body;

    if(!data){
        return res.json({error:"data is required"});
    }

    const newUtility = await Utility.create(data);

    res.status(200).json({
        success:true,
        data:newUtility,
        message:"Category created"
    });

} catch (error) {
    console.log(error);
    res.status(400).json({
        message:error
    })
}
}

exports.readUtilData = async(req,res) => {
    try {
          
        const {date,month} = req.params;
        
        const start = new Date(`2024-${month}-${date}`);
        start.setHours(0, 0, 0, 0);
        const end = new Date(`2024-${month}-${date}`);
        end.setHours(23, 59, 59, 999);

        const existData = await Utility.find({createdAt:{
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