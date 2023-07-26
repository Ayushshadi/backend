const http=require('http');
const server= http.createServer((req,res)=>{
    //req= 'Ayush shadi';
    console.log(req.url,req.headers,req.method);
    if(req.url==="/home")
    {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My page</title></head>');
    res.write('<body><h1>Welcome home</h1></body>');
    res.write('</html>');
    }
    if(req.url==="/about")
    {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My page</title></head>');
    res.write('<body><h1>Welcome about</h1></body>');
    res.write('</html>');
    }
    if(req.url==="/node")
    {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My page</title></head>');
    res.write('<body><h1>Welcome node</h1></body>');
    res.write('</html>');
    }
});
server.listen(4000);
