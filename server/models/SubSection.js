const mongoose= require("mongoose");

const subSection=new mongoose.Schema({
    title:{
        type:String,

    },
    timeDuration:{
        type:String,
    },
    description:{
        type:String,

    },
    videoUrl:{
        type:String,
    },
})

exports. SubSection=mongoose.model("SubSection",subSection);