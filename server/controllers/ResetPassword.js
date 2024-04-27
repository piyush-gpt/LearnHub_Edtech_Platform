const  {User}  = require( "../models/User");
const  {mailSender} = require("../utils/mailSender");
const {OTP}  = require( "../models/OTP");
const bcrypt=require("bcrypt");
const otpGenerator=require("otp-generator");

//user will first give us the email and we will send an otp on that email
exports. resetPasswordToken=async(req,res)=>{
    try{
        const {email}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.json({
            success:false,
            message:"Your email is not registered"
        })
    }

    var otp=otpGenerator.generate(5, { upperCaseAlphabets: false, lowerCaseAlphabets:false, specialChars: false });
      
    //check if otp generated is unique or not
    let result=await OTP.findOne({otp});
    while(result){
      otp=otpGenerator.generate(5, { upperCaseAlphabets: false, lowerCaseAlphabets:false, specialChars: false });
      result=OTP.findOne({otp});
    }

    const otpPayload={email,otp};
    //create entry for otp
    const otpBody=await OTP.create(otpPayload);

    await mailSender(email,"OTP for password reset",`password reset OTP:${otp} (valid for 5 min)`);

    return res.status(200).json({
        success:true,
        message:"Email sent successfully, change your password"
    })
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"something went wrong while reseting password"
        })
    }
}
// now in a new screen,  user will type otp , new password and confirm new password
exports. resetPassword=async (req,res)=>{
    try{
        const {password,confirmPassword,otp,email}=req.body;
    //validation
if (password !== confirmPassword) {
    return res.json({
    success: false,
    message: 'Password not matching',
    });
    }
   // find most recent otp stored for the user
   const recentOTP=await OTP.find({email}).sort({createdAt:-1}).limit(1);
   if(recentOTP.length==0){
       return res.status(400).json({
           success:false,
           message:"OTP expired"
       })
   }
   if(otp!=recentOTP[0].otp){
       return res.status(400).json({
           success:false,
           message:"Invalid OTP"
       })
   }
    //hash pwd.
    const hashedPassword = await bcrypt.hash (password, 10);
    //password update
    await User.findOneAndUpdate(
    {email},
    {password: hashedPassword},
    {new: true},
    );
    //return response
    return res.status(200).json ({
    success:true,
    message: 'Password reset successfull'
    })
    }
    catch(e){
        console.log(e);
        return res.status(200).json ({
            success:false,
            message: 'Password reset successfull'
        })
    }
}