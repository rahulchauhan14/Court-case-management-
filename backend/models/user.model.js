import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    role:{
        type:String,
        enum:["admin","lawyer","clerk","judge"],
        default:"clerk"
    }
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
        return;
    try{
        this.password=await bcrypt.hash(this.password,10)
        next()
    }
    catch(error){
        console.log("error during hashing")
    }
})
export default mongoose.model("User",userSchema)