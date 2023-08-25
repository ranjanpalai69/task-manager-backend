require("dotenv").config();
const { User } = require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


// register user and hashing the password 
const register=async(req,res)=>{
    const {username,password,email}=req.body;
    try{

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user already registered please login..."})
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const user= new User({email,password:hashedPassword,username});
        await user.save();
        res.status(201).json({message:"user registered successfully",data:user})

    }catch(error){
       console.log(error);
       res.status(500).json({message:"Registration Failed"})
    }
}


const login=async(req,res)=>{
    const {email,password} = req.body;
    try {
    const existingUser=await User.findOne({email});
    if(!existingUser){
        return res.status(404).json({message:"User not found"});
    }
    const matchPassword=await bcrypt.compare(password, existingUser.password);
    if(!matchPassword){
        return res.status(400).json({message:"Invalid Credentials"});
    }
    const token=jwt.sign({email:existingUser.email,id:existingUser._id},process.env.SECRET_KEY);
    res.status(200).json({token:token,user:existingUser}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"login failed",error:error})
    }
}



module.exports = {register,login}