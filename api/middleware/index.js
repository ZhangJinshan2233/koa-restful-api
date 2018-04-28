const jsonFormat=require('../middleware/jsonFormat');
const errorHandler=require('./errorHandler');
const cors=require('./cors');
const checkAuth=require('./check-auth');
const upload=require('./staticFile')

module.exports={
    jsonFormat:jsonFormat,
    errorHandler:errorHandler,
    cors:cors,
    checkAuth:checkAuth,
    upload:upload
}