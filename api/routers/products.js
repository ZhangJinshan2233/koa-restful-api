const Router=require('koa-router')

const router=new Router({prefix:'/products'})

const productController=require('../controller/product')

const middleware=require('../middleware/index')

router
    .get('/',productController.Get_All_Products)

    .post('/', middleware.checkAuth(),middleware.upload.single("productImage"), productController.Create_New_Product)

    .get('/:productId/',productController.Get_Product_By_ProductId)

    .patch('/:productId/',middleware.checkAuth(),productController.Update_Product_By_ProductId)

    .delete('/:productId',middleware.checkAuth(),productController.Delete_Product_By_ProductId)

    module.exports=router