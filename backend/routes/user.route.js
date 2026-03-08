import User from "../models/user.model.js"
import express from "express"
import jwt from "jsonwebtoken"
import { protect } from "../middlewares/auth.middleware.js"
import bcrypt from "bcryptjs"
const route=express.Router()

route.post("/register",async function(req,res){
    try{const {username,email,password,role}=req.body
    const emailAlreadyExists=await User.findOne({email})
    if(emailAlreadyExists)
        return res.status(400).json({message:"email already exist"})
    const user=await User.create({username,email,password,role})
    //TODO expires in 
    const token=await jwt.sign({_id:user._id,email:user.email,role:user.role},process.env.JWT_SECRET)
    // todo in cookie ->{
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: 24 * 60 * 60 * 1000,
    // }
    res.cookie("jwt",token)

    res.status(201).json({message:"user registered successfully",
        user:{
            id:user._id,
            email:user.email,
            role:user.role
        }
    })}
    catch(error){
        res.status(500).json({
      message: "Registration failed",
      error: error.message,
    })
        console.log("Error dusing registration",error)
    }
})

route.post("/login",async function(req,res){
    try{const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user)
        return res.json({message:"please register"})
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch)
        return res.json({message:"wrong password"})
    const token = await jwt.sign({id:user._id,email:user.email,role:user.role},process.env.JWT_SECRET)
    res.cookie("jwt",token)

    res.status(201).json({message:"login successful",
        user:{
            id:user._id,
            email:user.email,
            role:user.role
        }
    })}
    catch(error){
        console.log("Error during login",error)
        res.status(500).json({
      message: "login failed",
      error: error.message,
    })
    }
})
route.get("/check",protect,(req,res)=>{
    return res.json({role:req.user.role})
})
export default route