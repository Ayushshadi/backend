const express= require('express');
const router=express.Router();
const path=require('path');
router.get('/success',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','success.html'));
});
module.exports=router;