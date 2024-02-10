const  {RatingAndReview}  =require( "../models/RatingAndReview");
const  {Course}  =require( "../models/Course");
const mongoose =require( "mongoose");

// creating 
exports. createRating =async(req,res)=>{
    try{
        const userId=req.user.id;
        const{rating, review, courseId}=req.body;
        // check if user is enrolled in that course or not
        const courseDetails=await Course.findOne({_id:courseId},{
            studentsEnrolled:{$elemMatch:{$eq:userId}
        }});
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course"
            })
        }
        // check if user already reviewed the course

        const alreadyReviewed=await RatingAndReview.findOne({
            user:userId, 
            course:courseId
        })
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"already reviewed the course"
            })
        }
        // creating rating and review
        const ratingReview=await RatingAndReview.create({rating,review,course:courseId,user:userId})
        // adding this in the course

        await Course.findByIdAndUpdate(courseId,{
            $push:{
                ratingAndReviews:ratingReview._id
            }
        })

        return res.status(200).json({
            success:true,
            message:"Rating and Review Success"
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

// get average rating

exports. getAverageRating=async(req,res)=>{
    try{
        // get course id
        const {courseId}=req.body;
        // calculate avg rating

        let result=await RatingAndReview.aggregate([{
            $match:{
                course:new mongoose.Types.ObjectId(courseId)
            },
        },{
            $group:{
                _id:null,
                averageRating:{$avg:"$rating"}
            }
        }])
        result=result.toArray();

        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }
        // no rating of this course exist
        else{
            return res.status(200).json({
                success:true,
                message:"no rating given till now",
                averageRating:0
            })
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

// get all rating and reviews

exports. getAllRating= async(req,res)=>{
    try{
        const allReviews=await RatingAndReview.find({}).sort({rating:-1})
        .populate({
            path:"user",
            select:"firstName lastName email image"
        })
        .populate({
            path:"course",
            select:"courseName"
        }).exec();

        return res.status(200).json({
            success:true,
            message:"All reviews fetch successfully",
            data:allReviews
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}