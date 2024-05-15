require("dotenv").config();
const Product = require('../models/productModel');

exports.createProduct = async(req,res) => {
try {
    const{name} = req.body;
    const {buyer} = req.params;

    if(!name||!buyer){
        return res.json({error:"Name is required"});
    }

    const existProduct = await Product.findOne({buyer:buyer,name:name});

    if(existProduct){
      return res.status(500).json({
            message:"Product already exists",
        });
    }


    const newProduct = await Product.create({
        buyer,
        name,
    })
    res.status(200).json({
        success:true,
        data:newProduct,
        message:"Product created"
    });


} catch (error) {
    console.log(error);
    res.status(400).json({
        message:error
    })
}
}

exports.updateProduct = async(req,res) => {
    try {
   
        const {updatedName} = req.body;
        const {productId} = req.params;
 
        if(!updatedName){
            return res.json({error:"Name is required"});
        }
        
        const existProduct = await Product.findOne({_id:productId});

        if(!existProduct){
          return res.status(500).json({
                message:"Product doesn't exists",
            });
        }

        existProduct.name = updatedName;
        const updatedProduct = await existProduct.save();


        res.status(200).json({
            success:true,
            data:updatedProduct,
            message:"Category updated"
        });
    
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:error
        })
    }
    }

exports.deleteProduct = async(req,res) => {
        try {

            const {productId} = req.params;
       
        const existProduct = await Product.findOne({_id:productId});
    
        if(!existProduct){
          return res.status(500).json({
                message:"category doesn't exists",
            });
        }   
            
             await Product.findOneAndDelete({_id:productId});
            
            res.status(200).json({
                success:true,
                message:"Product deleted"
            });
        
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message:error
            })
        }
        }

exports.productList = async(req,res) => {
            try {
    
                const products = await Product.find({});

                res.status(200).json({
                    success:true,
                    data:products,    
                });
            
            } catch (error) {
                console.log(error);
                res.status(400).json({
                    message:error
                })
            }
            }

exports.readProduct = async(req,res) => {
                try {
                      
                const existProduct = await Product.findOne({_id:req.params.id});
            
                if(!existProduct){
                  return res.status(500).json({
                        message:"Product doesn't exists",
                    });
                }
                    
            
                    res.status(200).json({
                        success:true,
                        data:existProduct,
                    });
                
                } catch (error) {
                    console.log(error);
                    res.status(400).json({
                        message:error
                    })
                }
                }