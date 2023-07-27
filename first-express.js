const http=require('http');
const express= require('express');
const app=express();
app.use((res,req,next)=>{
    console.log('in middlewae');
    next();
});
app.use((req,res,next)=>{
console.log('next middleware');
res.send('<h1>Hello node js</h1>');
});

app.listen(3000);


