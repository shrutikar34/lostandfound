import {User} from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
    path:"../controller/.env"
});

export const Register = async (req,res)=>{
    try{
        const {name,email,password,phone} = req.body;
        if(!name || !email || !password || !phone){
            return res.status(401).json({
                message:"All fiels are required",
                success:false
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"User already exists",
                success:false
            })
        }
        
        const hashedPassword = await bcrypt.hash(password,10)
        const hashedPhone = await bcrypt.hash(phone,10) 

        await User.create({
            name,
            email,
            password:hashedPassword,
            phone:hashedPhone
        })
        return res.status(201).json({
            message:"Account created successfully",
            success:true
        })
    }
    catch(error){
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const Login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"All fiels are required",
                success:false
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).jsom({
                message:"User not found",
                success:false
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Incorrect password or email",
                success:false
            })
        }
        const tokenData ={
            userId:user._id,
        }
        const token = jwt.sign(tokenData,process.env.JWT_SECRET,{
            expiresIn:"1d"
        });
        
        return res.status(201).cookie("token",token,{expiresIn:"1d",httpOnly:true}).json({
            message:`Welcome back ${user.name}`,
            success:true
        })
    }
    catch(error){
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const Logout = (req,res)=>{
    return res.cookie("token","", {expiresIn:new Date(Date.now())}).json({
        message:"Logout successfully",
        success:true
    })
}