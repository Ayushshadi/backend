const http=require('http');
const express= require('express');
const app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
app.use('/',(res,req,next)=>{
    console.log('always runs');
    next();
});
app.use('/add-product',(req,res,next)=>{
console.log('next middleware');
res.send('<form action="/product" method="POST"><Input type="text"name="title"><button type="submit">add product</button></form>');
});
app.use('/product',(req,res,next)=>{
console.log(req.body);
res.redirect('/');
});
app.use('/',(req,res,next)=>{
    res.send('<h1> welcome back</h1>');
});
app.listen(3000);


