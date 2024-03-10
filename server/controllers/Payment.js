// const instance  =require( "../config/razorpay");
const {Course}  =require( "../models/Course");
const {User}  =require( "../models/User");
const mongoose = require("mongoose")
const  {mailSender} = require("../utils/mailSender");
// capture payment and initiate order of razorpay
exports. capturePayment=async(req,res)=>{
    //get courseId and UserID
    const {course_id} = req.body;
    const userId = req.user.id;
    //validation
    //valid courseID
    if(!course_id) {
        return res.json ({
        success: false,
        message: 'Please provide valid course ID',
        })
    };
    //valid courseDetail
    let course;
    try{
        course = await Course.findById (course_id);
        if(!course) {
            return res.json ({
            success: false,
            message: 'Could not find the course',
            });
    I}
    //user already pay for the same course
    const uid = new mongoose.Types.ObjectId(userId); 
    if (course.studentsEnrolled.includes (uid)) {
        return res.status (500).json ({
        success: false,
        message: 'Student is already enrolled',
        });
    }
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
        success:false,
        message:error.message
        })
    }
    // fetch order

    // const amount=course.price;
    // const currency="INR";
    // const options={
    //     amount:amount*100,
    //     currency,
    //     receipt:Math.random(Date.now()).toString(),
    //     notes:{
    //         courseId:course_id,
    //         userId
    //     }
    // }
    // try{
    //     // initiate payment using razorpay
    //     const paymentResponse=instance.orders.create(options);
    //     console.log(paymentResponse);
    //     return res.status(200).json({
    //         success:true,
    //         courseName:course.courseName,
    //         courseDescription:course.courseDescription,
    //         thumbnail:course.thumbnail,
    //         orderId:paymentResponse.id,
    //         currency:paymentResponse.currceny,
    //         amount:paymentResponse.amount
    //     })
    // }
    // catch(e){
    //     console.log(e);
    //     return res.json({
    //         success:false,
    //         message:"Could not initiate order"
    //     })
    // }
    try{
        const enrolledCourse=await Course.findByIdAndUpdate({_id:course_id},{
            $push:{
                studentsEnrolled:userId
            }
        },{new:true});
        if(!enrolledCourse){
            return res.status(500).json({
                success:false,
                message:"course not found"
            })
        }
        console.log(enrolledCourse);
    //     // find user and add the course in the list of courses enrolled
        const enrolledStudent=await User.findByIdAndUpdate({_id:userId},{
            $push:{
                courses:course_id,
            }
        },{new:true})
        console.log(enrolledStudent);

    //     // send a mail
        const emailResponse=await mailSender(enrolledStudent.email,"Congratulations from LearnHub", "Congratulations, you are enrolled into new LearHub course, Happy Learning")

        return res.status(200).json({
            success:true,
            message:"Course added"
        })
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

// verify signature of rozarpay and server

exports. verifySignature=async(req,res)=>{
    const webhookSecret="12345678";
    // encrypting the webhooksecret and matching it with signature
    const signature=req.headers['x-razorpay-signature'];
    const data=crypto.createHmac("sha256",webhookSecret);
    data.update(JSON.stringify(req.body));
    const digest = data.digest('hex');
    if(signature===digest){
        console.log("payment is authorized");
        // now doing all the actions that we have to do after a user buy a course

        const{userId, courseId}=req.body.payload.payment.entity.notes;
        try{
            const enrolledCourse=await Course.findByIdAndUpdate({_id:course_id},{
                $push:{
                    studentsEnrolled:userId
                }
            },{new:true});
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"course not found"
                })
            }
            console.log(enrolledCourse);
            // find user and add the course in the list of courses enrolled
            const enrolledStudent=await User.findByIdAndUpdate({_id:userId},{
                $push:{
                    courses:course_id,
                }
            },{new:true})
            console.log(enrolledStudent);

            // send a mail
            const emailResponse=await mailSender(enrolledStudent.email,"Congratulations from LearnHub", "Congratulations, you are enrolled into new LearHub course, Happy Learning")

            return res.status(200).json({
                success:true,
                message:"Course added"
            })
        }
        catch(e){
            return res.status(500).json({
                success:false,
                message:e.message
            })
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"invalid request"
        })
    }
}