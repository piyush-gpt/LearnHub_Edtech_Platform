const mongoose=require("mongoose");

require("dotenv").config();

exports. database=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
    })
    .then(()=>{
        console.log("DB connected successfully");
    })
    .catch((error)=>{
        console.log("BD connection failed");
        console.error(error);
        process.exit(1);
    });
}