const mongoose=require('mongoose');
mongoose
    .connect('mongodb://nodeKoaRest:1234567890@ds255539.mlab.com:55539/node-koa-restful')
//'mongodb://localhost/nodeRestShop' local mpngodb
    .then(()=>{
         console.log('connect to mongodb')
    })
    .catch(err=>{
         console.log(err.message);
         throw (500);
    })

mongoose.set('debug',true);

mongoose.Promise=global.Promise;

//refer all models
var User=require('./user');

var Order=require('./order');   //queue is different 

var Product=require('./product');

module.exports={
    Product:Product,
    Order:Order,
    User:User
}