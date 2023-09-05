require('dotenv').config(); 
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
const  Razorpay  = require('razorpay');
const Order = require("../models/order");
const Expenses = require("../models/appo-Details");
const User = require("../models/user");




exports.getPremium = async (req, res)=>{
  try{
    const token = req.header("Authorization");
    const user = jwt.verify(token,'AyushShadi');
    let id = user.userId;
    const payuser = await User.findByPk(id);
    const rzp = new Razorpay({
      key_id :'rzp_test_2Rk82zLDiRZ1uh',
      key_secret :'1ZeHxn6qvK6X2UOTBg648S29',
    })
    
    const  amount = 250;
    
 try{
   const order =   await  rzp.orders.create({amount , currency : "INR"})
  //  console.log(order)
   const newOreder =  await Order.create({
       orderId: order.id,
        status: 'PENDING',
        userId: payuser.id, 
   });
  //  console.log(newOreder)

   return res.status(201).json({ order:  newOreder, key_id: rzp.key_id });
  }catch(err){
    console.log('Razorepay error' , err);
    return res.status(500).json({ message: "Error creating order" });;
  }
}
  catch(err){
    console.error("Internal server error:", err);
    res.status(500).json({ message: 'internal in Razorpay Api call' });
  }
};





exports.updateTransactionStatus =async (req ,res)=>{
  try{
    const token = req.header("Authorization");
    const user = jwt.verify(token,'Ayushshadi');
    let id = user.userId;
    const payuser = await User.findByPk(id);
    const {order_id ,payment_id} = req.body;
   let order = await Order.findOne({where:{orderId : order_id}})
  //  console.log(order)
   await order.update({pamentId: payment_id ,status : "SUCCESSFUL"})
   await payuser.update({ispremiumuser : true})
   return res.status(202).json({success : true ,message : "Transection Successful" })

  }catch(err){
    return res.status(500).json({message : "internal server error"})
  }
}




exports.getfeature =async(req,res)=>{

try{
  const leaderBoardd = await User.findAll({
    attributes : ['id' , 'name' ,'totalExpenses'],
    include : [
      {
        model : Expenses,
        attributes : []
      }
    ],
    group : ['id'],
    order :[['totalExpenses' , "DESC"]]
  });
  
  res.status(200).json(leaderBoardd)
}catch(err){
  res.status(500).json(err)
}
}