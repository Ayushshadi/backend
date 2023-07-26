const http=require('http');
const fs =require('fs');
const { buffer } = require('stream/consumers');
const server= http.createServer((req,res)=>{
    const url= req.url;
    const method=req.method;
    const b=fs.readFileSync('message.txt');
    const con=b.toString();
    if(req.url==='/')
    {
    res.write('<html>');
    res.write('<head><title>Enter message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message" ></input> <button type="submit">submit</button></form></body>');
    res.write('<body><h1>'+con+'</h1></body>');
    res.write('</html>');
    return res.end();
    }
    if(url==='/message' && method==='POST')
    {
        const body=[];
        req.on('data', chunk =>{
            body.push(chunk);
        });
        return req.on('end', ()=>{
            const parsebody =Buffer.concat(body).toString();
            const msg=parsebody.split('=')[1];
            fs.writeFile('message.txt', msg, err=>{
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            });
        });
    
    }
    

});
server.listen(4000);
