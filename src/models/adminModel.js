const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    Age:{
        type:Number,
        required:true
    },
    Pincode:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    AadharNo:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports= mongoose.model("admin", adminSchema)

