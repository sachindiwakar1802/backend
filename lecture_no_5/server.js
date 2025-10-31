// server with routing
import http from 'http'
const server = http.createServer((req,res)=>{
  if(req.url==='/'){
    res.end('helle ji you are at right server')
  }
    else if(req.url==='/about'){
    res.end('helle ji you are at right server')
  }
});
const port = 8000;
 server.listen(port,()=>console.log(`server is runnung on the prot num ${port}`));
 
