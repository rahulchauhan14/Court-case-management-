import mongoose, { Types } from "mongoose";

const caseSchema=new mongoose.Schema({
    caseNumber:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["open","closed","pending"],
        required:true,
        default:"pending"
    },
    lawyerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        // required:true
    },
    judgeName:{
        type:String,
        // required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

export default mongoose.model("Case",caseSchema)