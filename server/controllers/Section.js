const {Section} = require("../models/Section")
const { Course }= require( "../models/Course")

exports. createSection = async(req,res)=>{
    try{
        const {sectionName,courseId}=req.body;
        if(!sectionName || ! courseId){
            return res.status(400).json({
                success:false,
                message:"missing properties"
            })
        }
        const newSection=await Section.create({sectionName});
        //updating the course
        const updatedCourse=await Course.findByIdAndUpdate(courseId,{
            $push:{
                courseContent:newSection._id
            }
        },{new:true}) .populate({ 
            path: 'courseContent',
            populate: {
              path: 'subSection',
            } 
         }).exec();

        return res.status(200).json({
             success:true,
             message:"section created successfully",
             updatedCourse,
        }) 
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"unable to create section",
            error:e.message
       }) 
    }
}

exports. updateSection=async (req,res)=>{
    try{
        const{sectionName,sectionId}=req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"missing properties"
            })
        }
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        return res.status(200).json({
            success:true,
            message:"section updated successfully",
            section,
       }) 
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"unable to update section",
            error:e.message
       }) 
    }
}

exports. deleteSection=async(req,res)=>{
    try{
        //get ID - assuming we are sending id in params
        const{sectionId}=req.body;
        
        const section=await Section.findByIdAndDelete(sectionId);
        return res.status(200).json({
            success:true,
            message:"section deleted successfully",
            section,
       }) 
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"unable to delete section",
            error:e.message
       }) 
    }
}