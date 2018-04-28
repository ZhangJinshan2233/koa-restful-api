const productsRouter=require('./products');

const orderRouter=require('./orders');

const userRouter=require('./user');

module.exports={
    productsRouter:productsRouter,
    orderRouter:orderRouter,
    userRouter:userRouter
}