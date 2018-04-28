const mongoose=require('mongoose');
const models=require('../model/index');

module.exports={
    Get_All_Products:async (ctx,next)=>{
        try{
            var products=await models.Product.find()
                                             .select("_id name price productImage")
                                             .exec();
            var response={
             counts:products.length,
             productData:products.map((product)=>{
                 return {
                     _id:product._id,
                     name:product.name,
                     price:product.price,
                     productImage:product.productImage,
                     path:'products/'+product._id
                 }
             })
            }
             if(products.length>0){
                 ctx.status=200;
                 ctx.json(response)
            }else{
             ctx.status=404;
             ctx.json({
                
                 message:"No valid entry found"
             })
            }
           
        }catch(err){
              ctx.status=500;
             ctx.json({
                 error:err
             })
        }

 },

    Create_New_Product:async (ctx,next)=>{
        const newProduct=new models.Product({
            _id:new mongoose.Types.ObjectId(),
            name:ctx.req.body.name,
            price:ctx.req.body.price,
            productImage:ctx.req.file.path
        })
        try{
            await newProduct.save();
            ctx.status=200;
            ctx.json({
                message:"Created successfully",
                createdProduct:{
                    _id:newProduct._id,
                    name:newProduct.name,
                    price:newProduct.price,
                    productImage:newProduct.productImage 
                }
            })
        }catch(err){
            ctx.status=500;
            ctx.json({
            error:err
            })
        }
    },

    Get_Product_By_ProductId:async(ctx,next)=>{
        const id=ctx.params.productId;
        console.log(id);
        try{

        var product=await models.Product
                                    .findById(id)
                                    .select('_id name price productImage')
                                    .exec();
        if(product){
                ctx.status=200;
                ctx.json({
                    product:product
                })
        }else{
            ctx.status=404;
            ctx.json({
            message:"No valid entry found for provided ID"
            })

        }
        
        }catch(err){
            ctx.status=500;
            ctx.json({
                error:err
            })
        }
    },

    Update_Product_By_ProductId:async(ctx,next)=>{
        const id=ctx.params.productId;
    try{
        var result= await models.Product
                                .update({_id:id},
                                {$set:{name:ctx.req.body.name,price:ctx.req.body.price}})
        ctx.status=200;
            ctx.json({
                message:"product updated successfully",
                _id:id
            })
        }catch(err){
        ctx.status=500;
        ctx.json({
            error:err
        })
        
     }
    
    },

    Delete_Product_By_ProductId:async(ctx,next)=>{
        const id=ctx.params.productId;
        try{
        result=await models.Product
                                .remove({_id:id})
                                .exec()
            ctx.status=200;
            ctx.json({
                message:"deleted successful"
            })
        }catch(err){
            ctx.status=500;
            ctx.json({
                error:err
            })
        }

    }
}