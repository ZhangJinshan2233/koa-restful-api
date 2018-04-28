const http=require("http");
const app=require('./app');

const port=process.env.PORT||3000;

const server=http.createServer(app.callback());

server.listen(port,'192.168.1.145',()=>{
    console.log(`server is listening on port ${port}`)
});