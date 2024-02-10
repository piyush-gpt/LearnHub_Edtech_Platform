const jwt=require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/User");

// auth

exports. auth=async (req,res,next)=>{
    try{
        const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
        
        // if token missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }
        // verify token
        try{
            const decode= jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;

        }
        
        catch(e){
            return res.status(401).json({
                success:false,
                message:"Token is wrong"
            })
        }
        next();
    }
    catch(e){
        console.log(e);
        return res.status(401).json({
            success:false,
            message:"something went wrong while validating the token"
        })
    }
}

//isStudent
exports. isStudent=async (req,res,next)=>{
    try{
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for students only"
            })
        }
        next();
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })
    }
}

//isInstructor

exports. isInstructor=async (req,res,next)=>{
    try{
        if(req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for instructors only"
            })
        }
        next();
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })
    }
}

//isAdmin

exports. isAdmin=async (req,res,next)=>{
    try{
        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin only"
            })
        }
        next();
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })
    }
}
