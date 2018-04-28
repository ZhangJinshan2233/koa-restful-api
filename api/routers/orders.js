const Router=require('koa-router');

const router=new Router({prefix:'/orders'});

const orderController=require('../controller/order');

const middleware=require('../middleware/index');

router
    .get('/',middleware.checkAuth(),orderController.Get_All_Orders)

    .post('/',middleware.checkAuth(),middleware.upload.single(),orderController.Creat_New_Order)

    .get('/:orderId',middleware.checkAuth(),orderController.Get_Order_By_OrderId)

    .delete('/:orderId/',middleware.checkAuth(),orderController.Delete_Order_By_OrderId)
    
    module.exports=router