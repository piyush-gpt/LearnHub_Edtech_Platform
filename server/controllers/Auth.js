const  {OTP} =require("../models/OTP");
const {User}= require("../models/User");
 const{ Profile }= require( "../models/Profile");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const Jwt=require("jsonwebtoken");
const {mailSender}  =require( "../utils/mailSender");

 // sendOTP

 exports. sendOTP=async (req,res)=>{
     try{
        const {email}=req.body;
     // check if user already has an account
     const checkUserPresent=await User.findOne({email});

     if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User already registered"
        })}

      var otp=otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets:false, specialChars: false });
      
      //check if otp generated is unique or not
      let result=await OTP.findOne({otp});
      while(result){
        otp=otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets:false, specialChars: false });
        result=await OTP.findOne({otp});
      }

      const otpPayload={email,otp};
      //create entry for otp
      const otpBody=await OTP.create(otpPayload);
      await mailSender(email,"OTP for SignUp", `OTP for signing up is ${otp}`)
      return res.status(200).json({
        success:true,
        message:"otp sent successfully",
        otp
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
// signup
exports. signUp =async (req,res)=>{
    try{
        //data fetch from request ki body
    const{
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
        }=req.body;
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
        // password matching
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirm password values doesnot match"
            })
        }
        // chrck if user already exist
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already registered"
            })
        }
    
        // find nmost recent otp stored for the user
        const recentOTP=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        if(recentOTP.length==0){
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
        }
        if(otp!==recentOTP[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }
        // hashing the password
        const hashedPassword=await bcrypt.hash(password,10);
    
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth: null,
            about: null,
            contactNumer:null,
        });
    
    
        // creating entry in db
        
        const user=await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    
        })
    
        return res.status(200).json({
            success:true,
            message:"User is registered successfully",
            user
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered, please try again",
        })
    }
}        

//login
exports. login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || ! password){
            return res.send(403).json({
                success:false,
                message:"all fields are required",
            })
        }
        // check user already exist or not
        const user=await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user is not registered",
            })
        }
        if(await bcrypt.compare(password,user.password)){
            //generate JWT, after password matching
            const payload = {
                email: user.email,
                id: user._id,
                accountType:user.accountType,
                }
                const token = Jwt.sign(payload, process.env.JWT_SECRET, { 
                expiresIn: "2h",
                });
                user.token = token;
                user.password= undefined;
    
                //create cookie and send response
                const options = {
                    expires: new Date(Date.now() + 3*24*60*60*1000),
                    httpOnly:true
                }
                res.cookie("token", token, options).status (200).json({
                success:true,
                token,
                user,
                message: 'Logged in successfully',
                })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }
    }                
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"login failure, please try again"
        })
    }
}

//changeassword

exports. changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				"passwordUpdated",
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				);
			// console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
}