
const models=require('../model/index');
const mongoose=require('mongoose');

module.exports={
    Creat_New_Order:async (ctx,next)=>{   
        const id=ctx.req.body.productId
        console.log(ctx.req.body)
        try{
                var product=await models.Product
                                        .findById({_id:id})
                                        .exec();
                if(!product){
                    ctx.status=404
                    ctx.json({
                        message:"no existed product"
                    })
                } else{
                    const newOrder=new models.Order({
                        _id:new mongoose.Types.ObjectId(),
                        product: ctx.req.body.productId,
                        quantity:ctx.req.body.quantity
                    })
    
                    await newOrder.save();
                    ctx.status=200;
                    ctx.json({
                        message:"Created successfully",
                        createdOrder:{
                            _id:newOrder._id,
                            product:newOrder.product,
                            price:newOrder.quantity
                        }
                     })
                }                
                
        }catch(err){
            ctx.status=500;
            ctx.json({
            error:err
            })
        }
      
    },

    Get_All_Orders:async (ctx,next)=>{
        try{
            var ordersData=await models.Order.find()
                                            .select('_id product quantity')
                                            .populate('product','name')
                                            .exec();

            var responses=ordersData.map((order)=>{
                return{
                        _id:order._id,
                        product:order.product,
                        quantity:order.quantity
                }
            })
            ctx.status=200;
            ctx.json({
                counts:responses.length,
                orders:responses
            })
        }catch(err){
            ctx.status=500;
            ctx.json({
                error:err
            })
        }
        
    },

    Get_Order_By_OrderId:async(ctx,next)=>{
        var id=ctx.params.orderId;
        console.log(id)
        try{
            var order =await models.Order
                                    .findById({_id:id})
                                    .select('_id product quantity')
                                    .populate('product','name price')
                                    .exec()
            if(order){
                ctx.status=200;
                ctx.json({
                    order:order
                })
            }else{
                ctx.status=404;
                ctx.json({
                    message:"no valid entry for procides ID"
                })
            }

        }catch(err){
            ctx.status=500;
            ctx.json({
                error:err
            })
        }
        
    
    },

    Delete_Order_By_OrderId:async(ctx,next)=>{
        const id=ctx.params.orderId;
        try{
            await models.Order
                        .remove({_id:id})
                        .exec()
            ctx.status=200;
            ctx.json({
            message:"deletes successfully" 
            })
        }catch(err){
            ctx.status=500;
            ctx.json({
                error:err
            })
        }

    }



}
