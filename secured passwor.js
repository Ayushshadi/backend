const User=require('../models/user');
const path=require('path');
const rootDir=require('../util/path.js');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const saltRounds=10;

require('dotenv').config();
 
//const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;

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
    // console.log(req.body);
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
                    const hash= await bcrypt.hash(password,saltRounds)
                     
                      await  User.create({name,email,password:hash})
                        res.status(200).send({message:"user created successfully"});
                
           
                }
         
              
            }catch(error) {
                if (error.type === "error") {
                    res.status(403).send(error);
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
        
          const users=await  User.findAll({where:{email}})
                if(users.length==0) {
                       throw{type:'error',message:"user not found!"};
                }
              else{
                const user=users[0]
                bcrypt.compare(password,user.password, (err,result)=>{
                    if(err){
                        res.status(500).send({type:'error',message:'someting went wrong!'})
                    }
                    if(result==true){
                        //const token=jwt.sign({userId:user.id,userEmail:user.email});
                        //console.log(user.password);
                        res.status(200).send({message:'logged in successfully'})
                    }
                    else{
                        res.status(404).send({type:'error',message:'password is incorrect'});
                    }
                })
              }
                
            
    } catch (error) {
        console.log(error);
        if (error.type === "error") {
            res.status(404).send(error);
          } else {
            console.log(error);
            res.status(500).send(error);
          }
    }
}
