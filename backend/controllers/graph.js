require("dotenv").config();
const Data = require('../models/dataModel');

exports.readGraph = async(req,res) => {
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
                return res.status(200).json({
                    success:true,
                    data:0,
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

exports.monthlyGraph = async(req,res) => {
            try {
                
                const days = [31,29,31,30,31,30,31,31,30,31,30,31];

                const {month} = req.params;
                
                const startDate = new Date(`2024-${month}-01`);
                startDate.setHours(0, 0, 0, 0);
                const endDate = new Date(`2024-${month}-${days[month-1]}`);
                endDate.setHours(23, 59, 59, 999);

                const existData = await Data.find({createdAt:{
                    $gte:startDate,
                    $lte:endDate
                } });

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
