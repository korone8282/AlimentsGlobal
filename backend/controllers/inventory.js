require("dotenv").config();
const Inventory = require('../models/inventoryModel');

exports.readInventory = async(req,res) => {
    try {
                                    
                  
        const existData = await Inventory.find({});

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


exports.addInventory = async(req,res) => {
    try {
                                    
        const{pDate,name,stock,rate,lDate} = req.body;

        if(!name||!stock){
            return res.json({error:"Name is required"});
        }
    
        const existItem = await Inventory.findOne({name:name});

        if(existItem){
          return res.status(500).json({
                message:"item already exists",
            });
        }

        const newItem = await Inventory.create({
            pDate,
            name,
            stock,
            rate,
            quant:stock,
            lDate,
        })
                                                
                res.status(200).json({
                    success:true,
                    data:newItem
                })
                                                    
                    } catch (error) {
                        console.log(error);
                        res.status(400).json({
                        message:error
                                })
                                    }
                                            }


exports.deleteInventory = async(req,res) => {
    try {
                                    
        const {inventoryId} = req.params;
       
        const existItem = await Inventory.findOne({_id:inventoryId});

        if(!existItem){
          return res.status(500).json({
                message:"category doesn't exists",
            });
        }   
            
             await Inventory.findOneAndDelete({_id:inventoryId});
                                                
                res.status(200).json({
                    success:true,
                })
                                                    
                    } catch (error) {
                        console.log(error);
                        res.status(400).json({
                        message:error
                                })
                                    }
                                            }


exports.updateInventory = async(req,res) => {
    try {
                                
        const{pDate,name,stock,rate,lDate} = req.body;
        const {inventoryId} = req.params;
        
        const existItem = await Inventory.findOne({_id:inventoryId});

        if(!existItem){
          return res.status(500).json({
                message:"category doesn't exists",
            });
        }
        
        existItem.name = name || existItem.name;
        existItem.stock = stock || existItem.stock;
        existItem.rate = rate || existItem.rate;
        existItem.pDate = pDate || existItem.pDate;
        existItem.lDate = lDate || existItem.lDate;

        const updatedItem = await existItem.save();
                          
                res.status(200).json({
                    success:true,
                    data:updatedItem,
                })
                                                    
                    } catch (error) {
                        console.log(error);
                        res.status(400).json({
                        message:error
                                })
                                    }
                                            }
