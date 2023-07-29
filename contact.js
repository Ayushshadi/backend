const express=require('express');
const router= express.Router();
const path=require('path');

router.get('/contact',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','contact.html'));
    });
router.post('/contact',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/success');
    });
module.exports=router;