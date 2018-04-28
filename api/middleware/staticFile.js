const multer=require('koa-multer');
const path=require('path');

    const storage=multer.diskStorage({
        destination:function(ctx,file,cb){
            cb(null,'./uploads')
        },
        filename:function(ctx,file,cb){
            cb(null,file.originalname)
        }
    })

    const fileFilter=(ctx,file,cb)=>{
        if(file.mimetype==='image/jpeg'||file.mimeType==='image/png')
        {
            cb(null,true);
        }else{
            cb(null,false)
        }
    }

    const upload=multer({
        storage:storage,
        limits:{
            fieldSize:1024*1024*5
        },
        fileFilter:fileFilter
    })

    module.exports=upload