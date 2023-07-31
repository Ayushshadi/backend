const path=require('path');
exports.getaddcontroller=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../add-product.html'));
    };
exports.postAddcontroller=((req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
    });
exports.showproducts=((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','shop.html'));
});