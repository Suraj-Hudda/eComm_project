const mongoose=require("mongoose")


/**
 * name
 * user id
 * password
 * email
 * user type */ 

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        minLength:10,
        required:true,
        unique:true,
        lowercase:true
    },
    usertype:{
        type:String,
        required:true,
        default:"CUSTOMER",
        enum:["CUSTOMER","ADMIN"]
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model("user",userSchema)
