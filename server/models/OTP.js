const mongoose=require( "mongoose");
const { mailSender }=require( "../utils/mailSender");

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:'5m',// the document will expire or delete in 5 minutes of its creating 
    },
})

async function sendVerificationEmail(email, otp){
    try{
        const mailResponse=await mailSender(email,"Verification mail from LearnHub",otp);
    }
    catch(e){
        console.log("Error occured while sending opt email:",e);
    }
}

otpSchema.pre("save",async (next)=>{
    await sendVerificationEmail(this.email,this.otp);
    next();
})

exports. OTP =mongoose.model("OTP",otpSchema);