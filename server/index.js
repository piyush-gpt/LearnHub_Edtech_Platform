const express=require("express");
const  {database}= require("./config/database.js");
const {cloudinaryConnect} =require( "./config/cloudinary.js");
require("dotenv").config();

const app=express();

const userRoutes=require("./routes/User");
const courseRoutes=require("./routes/Course");
const profileRoutes=require("./routes/Profile");
const paymentRoutes=require("./routes/Payment");
const contactUsRoute=require("./routes/Contact")
database();
const cookieparser=require("cookie-parser");
const cors=require("cors");
const fileupload=require("express-fileupload");

const PORT=process.env.PORT || 4000;

app.use(express.json());
app.use(cookieparser());
app.use(
    cors({
        origin: ["https://learn-hub-edtech-platform.vercel.app"],
		credentials: true,
    })
)
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

cloudinaryConnect();

app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/payment",paymentRoutes)
app.use("/api/v1/reach", contactUsRoute);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Server is fine and running"
    })
})

app.listen(PORT,()=>{
    console.log("App is running at port: ",PORT);
})