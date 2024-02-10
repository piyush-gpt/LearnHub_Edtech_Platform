const  {Category}  =require( "../models/Category");
const  {Course}  =require( "../models/Course");
const  {User}  =require( "../models/User");
const  {uploadImageToCloudinary}  =require( "../utils/imageUploader");
require("dotenv").config();


exports. createCourse=async (req,res)=>{
    try{
        const {courseName,courseDescription,whatYouWillLearn,price,category,tag}=req.body;
        const thumbnail=req.files.thumbnailImage;
        if(!courseDescription ||!courseName || !whatYouWillLearn || !price || !category ||!thumbnail || !tag){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }
        // getting instructor details 
        const userId=req.user.id;
        const instructorDetails=await User.findById(userId);
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor not found"
            })
        }
        // check given category is valid or not
        const currCategory=await Category.findOne({name:category});
        if(!currCategory){
            return res.status(404).json({
                success:false,
                message:"invalid Category"
            })
        }
        // uploading image to cloudinary
        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        // entering in db
        const newCourse=await Course.create({courseName,courseDescription,tag,Instructor:userId,
        whatYouWillLearn,price,category:currCategory._id, thumbnail:thumbnailImage.secure_url})

        // add this new course to User schema of instructor
        const updatedInstructorData=await User.findByIdAndUpdate(userId,{
            $push:{
                courses:newCourse._id,
            }
        },{new:true})

        //updating Category schema
        const updatedCategoryData=await Category.findOneAndUpdate({name:category},{
            $push:{
                course:newCourse._id,
            }
        })
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"error while creating the course"
        })
    }
}

// get all courses

exports. getAllCourses=async (req,res)=>{
    try{
        const allCourses=await Course.find({},{courseName:true, price:true, thumbnail:true, instructor:true, ratingAndReviews:true, studentsEnrolled:true}).popolate("instructor").exec();

        return res.status(200).json({
            success:true,
            message:"Data for all courses fetched",
            data:allCourses
        })
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"cannot fetch course data",
            error:e.message
        })
    }
}

// get courseDetails

exports. getCourseDetails=async(req,res)=>{
    try{
        const {courseId}= req.body;

        const courseDetails=await Course.find({_id:courseId}).populate({
            path:"Instructor",
            populate:{
                path:"additionalDetails"
            },

        }).populate("category").populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`could not find the course with id:${courseId}`
            })
        }

        return res.status(200).json({
            success:true,
            message:"Course details fetch successfully",
            courseDetails
        })

    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}