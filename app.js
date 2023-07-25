const http=require('http');
const server= http.createServer((req,res)=>{
    req= 'Ayush shadi';
    console.log(req);
});
server.listen(4000);