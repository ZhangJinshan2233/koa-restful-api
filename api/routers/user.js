const Router=require('koa-router');

const router=new Router({prefix:'/users'});

const middleware=require('../middleware/index');

const userController=require('../controller/user')

router

    .post('/signup',middleware.upload.single(), userController.SignUp)

    .post('/login',middleware.upload.single(), userController.LogIn)

    .delete('/:userId/', userController.Delete_User_By_UserId)

    module.exports=router