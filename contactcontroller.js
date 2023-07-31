const path=require('path');
exports.getcontact=((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','contact.html'));
    });
exports.postcontact=((req,res,next)=>{
    console.log(req.body);
    res.redirect('/success');
    });
exports.sucess=((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','success.html'));
});