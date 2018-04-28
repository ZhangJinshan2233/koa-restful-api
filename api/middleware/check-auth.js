const jwt =require('jsonwebtoken');
    function checkAuth(ctx,next){
        return async (ctx,next)=>{
            try{
              const token=ctx.request.header.authorization.split(" ")[1];
                const decoded=jwt.verify(token,"secret")
                 ctx.req.userData=decoded;
                await next();
            }catch(err){
                   ctx.status=500;
                   ctx.json({
                       error:err
                   }) 
            }
            
        }
    }

    module.exports=checkAuth