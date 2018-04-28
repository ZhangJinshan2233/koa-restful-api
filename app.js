const koa=require('koa');

const routers=require('./api/routers/routers');

const middleware=require('./api/middleware/index');

const path=require('path');

const staticFiles=require('koa-static');

const bodyparser=require('koa-bodyparser');

const staticPath = '/';

    app=new koa();


    app.use(middleware.errorHandler());//can not finds url

    app.use(middleware.cors());

    app.use(staticFiles(path.join( __dirname,staticPath)))

    app.use(bodyparser());

    //bodyparser and multer get different response ctx.request, ctx.req

    app.use(async(ctx,next)=>{
      ctx.req.body=ctx.request.body
      await next()
    })

    app.use(middleware.jsonFormat());

    app.use(routers.productsRouter.routes());
    
    app.use(routers.orderRouter.routes());

    app.use(routers.userRouter.routes());
    //deal with all kinds of error
    app.on("error", (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500||ctx.status===500) {
    ctx.status=err.status||500
      ctx.json({
         error:{
             message:err.message
         }
      })
    }
    // if (ctx && ctx.log && ctx.log.error) {
    //   if (!ctx.state.logged) {
    //     ctx.log.error(err.stack)
    //   }
    // }
  }) 



  module.exports=app