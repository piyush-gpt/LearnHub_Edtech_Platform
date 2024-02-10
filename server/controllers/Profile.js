const  {Profile}  =require( "../models/Profile");
const  {User}  =require( "../models/User");
const {Course}  =require( "../models/Course");
const { uploadImageToCloudinary } =require("../utils/imageUploader");
exports. updateProfile=async(req,res)=>{
    try{
        //get data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;
        //get userId
        const id= req.user.id;
        //validation
        if(!contactNumber || !gender || !id) {
            return res.status (400).json ({
            success: false,
            message: 'All fields are required',
            });
        }
        //find profile
        let userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile. findById(profileId);

        //update profile
        profileDetails.dob = dateOfBirth;
        profileDetails.about= about;
        profileDetails.gender = gender;
        profileDetails. contactNumber = contactNumber;
        await profileDetails.save();
        userDetails = await User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            updatedProfile:userDetails
        })
    }
    catch(e){
        return res.status(500).json({
            success:false,
            error:e.message
        })
    }
}

// delete account
exports. deleteAccount=async(req,res)=>{
    try{
        //get id
        const id = req.user.id;
    
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails) {
        return res.status (404).json({
        success: false,
        message: 'User not found',
        });
        }
        //delete profile
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});
        //now remove user from enrolled courses

        if(req.user.accountType=="Student"){
            for(let i=0;i<userDetails.courses.length;i++){
                const currCourse=await Course.findByIdAndUpdate(userDetails.courses[i],{
                    $pull:{
                        studentEnrolled:id
                    }
                });
            }
        }
        //delete user
        await User.findByIdAndDelete({_id:id}); 
        //return response
        return res.status(200).json({
            success:true,
            message:"account deleted"
        })
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"user cannot be deleted"
        })
    }
}

exports. getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports. updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        90
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      ).populate("additionalDetails").exec();
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports. getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
