 const mongoose =require("mongoose");

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
})

exports. Category=mongoose.model("Category",categorySchema);