import { protect } from "../middlewares/auth.middleware.js"
import { authorize } from "../middlewares/authorize.middleware.js"
import Case from "../models/case.model.js"
import express from "express"
import User from "../models/user.model.js"

const route=express.Router()

route.get("/",protect,authorize("lawyer","admin","clerk"),async (req,res)=>{
    try{const query={}
    if(req.user.role==="lawyer")
        query.lawyerId=req.user.id

    const cases=await Case.find(query).populate("lawyerId","username email").populate("createdBy","username role").sort({createdAt:-1})
    res.json(cases)}
    catch(error){
        console.log('error during fetching',error)
        res.status(500).json({ message: "Failed to fetch cases" })
    }
})

route.get("/:id",protect,authorize("lawyer","admin","clerk"),async (req,res)=>{
    try {
        const courtCase=await Case.findById(req.params.id)
        if(!courtCase)
            return res.status(404).json({message:"case not found"})
        if(req.user.role==="lawyer"&&courtCase.lawyerId.toString()!==req.user.id)
            return res.status(403).json({message:"unauthorized"})
        res.json(courtCase)
    } catch (error) {
        console.log("error during getting case by id",error)
        res.status(400).json({message:"invalid case id"})
}
})

route.post("/",protect,authorize("admin","clerk"),async function(req,res){
    try{
        const { caseNumber, title, description, lawyerId ,judgeName} = req.body;

      if (!caseNumber || !title || !description || !lawyerId|| !judgeName) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }
      const unique=await Case.findOne({caseNumber})
      if(unique)
        return res.status(400).json({
          message: "Case no already exist",
        });
        const lawyer=await User.findById({_id:lawyerId,role:"lawyer"})
        if(!lawyer)
            return res.status(400).json({message:"invalid lawyer"})
        const newCase=await Case.create({
            caseNumber,
            title,
            description,
            lawyerId,
            judgeName,
            createdBy:req.user.id
        })
        res.status(201).json(newCase)
    }catch(error){
        console.log("error during court case creation",error)
        res.status(500).json({
      message: "Case creation failed",
      error: error.message,
    });
    }
})

route.put("/:id",protect,authorize("admin","clerk"),async (req,res)=>{
    try {
        const allowedUpdates=["title", "description", "status", "lawyerId"];
        const update={}
        for(const field of allowedUpdates)
        {
            if(req.body[field]!==undefined)
                update[field]=req.body[field]
        }
        delete req.body.createdBy
        if(update.lawyerId){
            const lawyer=await User.find({_id:update.lawyerId,role:"lawyer"})
            if(!lawyer)
                return res.status(400).json({message:"invalid lawyer id"})
        }
        const updated=await Case.findByIdAndUpdate(req.params.id,update,{new:true,runValidators:true})
        if(!updated)
            return res.status(404).json({message:'case not found'})
        res.json(updated)
    } catch (error) {
        console.log("error during case update",error)
        res.status(400).json({
      message: "Update failed",
      error: error.message,
    });
    }
})

route.delete("/:id",protect,authorize("admin"),async (req,res)=>{
    try{const deleted=await Case.findByIdAndDelete(req.params.id)
    if(!deleted)
        return res.status(404).json({message:'case not found'})
    res.json({message:"case deleted"})}
    catch(error){
        console.log("error during case delete",error)
        res.status(400).json({ message: "Delete failed" });
    }
})
export default route