const userModel=require("../model/user")
const slotModel=require("../model/slotmodel")
const {isValidObjectId,isValidPincode ,isValidString,isValidPhone,isValidPswd,isValidDate}=require("../util/validation")
const jwt = require('jsonwebtoken');

const creatuser=async function(req,res){
    try{
        let data=req.body
        if(Object.keys(data).length==0)return res.status(400).send({status:false,msg:"can't create user with empty body"})

      let {name,phone,password,Age,Pincode,Aadhar}=data
     
      let newArr=["name","phone","password","Age","Pincode","Aadhar"]
      for(i of newArr){
       if(!data[i])return res.status(400).send({status:false,msg:`${i} is mandatory please input ${i}`})
      }


      if(isValidString(name.trim()) || !name.trim())return res.status(400).send({status:false,msg:"please enter a valid name"})
      if(!isValidPhone(phone.trim()))return res.status(400).send({status:false,msg:"please enter a valid phone No"})
      if(!isValidPswd(password.trim()))return res.status(400).send({status:false,msg:"please enter a valid password"})
      if (!isValidPincode(Pincode))return res.status(400).send({ status: false, message: "please enter a valid pincode " }) 
      if(typeof(Age)!="number" || Age==0)return res.status(400).send({ status: false, message: "please enter a valid age in numbers" }) 
      if(typeof(Aadhar)!="number")return res.status(400).send({ status: false, message: "please enter a valid aadhar no in numbers" }) 
      if(Aadhar.toString().length!=12)return res.status(400).send({ status: false, message: "please enter a valid aadhar no" }) 



 const oldUser=await userModel.findOne({phone:phone}) 
 if(oldUser)return res.status(400).send({status:true,msg:"User already exist with this Mobile no"})      

 const oldUser1=await userModel.findOne({Aadhar:Aadhar}) 
 if(oldUser1)return res.status(400).send({status:true,msg:"User already exist with this aadhar no"})      


 const user=await userModel.create(data)
 res.status(201).send({status:true,data:user})
    }
    catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}

const login=async function(req,res){
    try{
        let data=req.body
        let {phone,password}=data
        if(!password)return res.status(400).send({status:false,msg:"can't login without password"})
        if(!phone)return res.status(400).send({status:false,msg:"can't login without Mobile No"})

       const login=await userModel.findOne({phone:phone})
       if(!login)return res.status(400).send({status:false,msg:"can't find any user with this mobile no"})
       if(login.password!=password)return res.status(400).send({status:false,msg:"Please enter a correct password"})
       
       let token=jwt.sign({userId:login._id},"secret",{expiresIn:"10d"})

       res.status(200).send({status:true,data:token})

    }
    catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}



module.exports={creatuser,login,}