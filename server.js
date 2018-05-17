const http=require("http");
const app=require('./app');

const port=process.env.PORT||3000;

const server=http.createServer(app.callback());

server.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
});