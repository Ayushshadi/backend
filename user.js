const User=require('../models/user');
const rootDir=require('../util/path.js');
const path=require('path');
exports.homepage=(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','signup.html'));

}
exports.page=(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','login.html'));

}
function  isNotValid(str){
    if(str==undefined || str.length==0){
         return true;
    }
    else{
        return false;
    }
}
exports.signUp=async (req,res,next)=>{
    console.log(req.body);
    const {name,email,password}=req.body;
    if(isNotValid(name) || isNotValid(email) || isNotValid(password)){
        return res.status(400).send({type:'error',message:'Invalid Form Data!'})
    }
    try {
      
          const users=await  User.findAll({where:{email:email}})
           
                if(users.length==1){
                    throw{type:"error",message:"User Already Exists!"}
                }
                else{
                     
                      await  User.create({name,email,password})
                        res.status(200).send({message:"user created successfully"});
                                        
           
                }
         
              
            }catch(error) {
                if (error.type === "error") {
                    res.status(401).send(error);
                  } else {
                    console.log(error);
                    res.status(500).send(error);
                  }
        }
    }

    
  



exports.logIn=async (req,res,next)=>{
   
    const {email,password}=req.body;
    // console.log(req.body);

    if( isNotValid(email) || isNotValid(password)){
        return res.status(400).send({type:'error',message:'Invalid Form Data!'})
    }

    try {
        
          const users=await  User.findAll({where:{email:email}})
                if(users.length==0) {
                       throw{type:'error',message:"user not found!"};
                }
              else{
                const user=users[0]
                if(password===user.password)
                {
                res.status(200).send({message:'logged successfully'})
                }
                    else{
                        res.status(401).send({type:'error',message:'password is incorrect'});
                    }
                }
                
            
    } catch (error) {
        console.log(error);
        if (error.type === "error") {
            res.status(401).send(error);
          } else {
            console.log(error);
            res.status(404).send(error);
          }
    }

    
        
    }
