const models=require('../model/index');
const mongoose=require('mongoose');
const bcyrptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
module.exports={
    SignUp:async (ctx,next)=>{       
        try{
            const user= await models.User.find({email:ctx.req.body.email}).exec();
            if(user.length>=1){
                    return ctx.json({
                        status:409,
                        message:"user existed"
                    })
            }else{
                const hashPassword= await  bcyrptjs.hash(ctx.req.body.password,10);
                const newUser=new models.User({
                    _id:new mongoose.Types.ObjectId(),
                    email:ctx.req.body.email,
                    password:hashPassword
                })
                const userData= await newUser.save();
                ctx.status=201;
                ctx.json({
                message:"Created successfully",
                newUserObj:{
                     _id:userData._id,
                     email:userData.email,
                     password:userData.password
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

    LogIn:async (ctx,next)=>{
        try{
                const user=await models.User.find({email:ctx.req.body.email}).exec()
                if(user.length<1){
                    return [ctx.status=500,ctx.json({
                        message:"Auth failed"
                    })]
                }
              const checked= await bcyrptjs.compare(ctx.req.body.password,user[0].password);
               
              if(checked){
                const token=  jwt.sign(
                      {
                      email:user[0].email,userId:user[0]._id
                      },
                      "secret",
                      {
                        expiresIn:'1h'
                      }
                    )
                    ctx.status=200;
                    ctx.json({
                        message:"Auth successfully",
                        token:token
                    })
                }
                else{
                    ctx.status=500;
                    ctx.json({
                        message:"Auth failed"
                    })
                }
        }catch(err){
            ctx.status=500;
            ctx.json({
                error:err
            })
        }
    },

    Delete_User_By_UserId:async(ctx,next)=>{
        const id=ctx.params.userId;
        try{
            await models.User
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