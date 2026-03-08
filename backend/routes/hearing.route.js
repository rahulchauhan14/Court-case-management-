import express from "express"
import { protect } from "../middlewares/auth.middleware.js"
import { authorize } from "../middlewares/authorize.middleware.js"
import Case from "../models/case.model.js"
import Hearing from "../models/hearing.model.js"
const route=express.Router()

route.get("/:caseId",protect,authorize("admin","clerk","lawyer"),async function(req,res){
    try {
        const caseExist=await Case.findById({_id:req.params.caseId})
        if(!caseExist)
            return res.status(404).json({message:"case not found"})
        if(req.user.role==="lawyer"&&req.user.id!==caseExist.lawyerId.toString())
            return res.status(403).json({message:"unauthorized"})
        const hearings=await Hearing.find({caseId:req.params.caseId}).populate("createdBy","username role").sort({date:1})
        res.json(hearings)
    } catch (error) {
        console.log("error in getting case hearing",error)
        res.status(500).json({
      message: "get hearing failed",
      error: error.message,
    });
    }
})

route.post("/",protect,authorize("admin","clerk"),async function(req,res){
    try {
        const {caseId,date,remarks,nextHearingDate}=req.body
        if(!caseId||!date||!remarks)
            return res.status(400).json({message:"all fiels are required"})
        const caseExist=await Case.findById(caseId)
        if(!caseExist)
            return res.status(404).json({message:"case not found"})
        const hearing={
            caseId,
            date,
            remarks,
            createdBy:req.user.id
        }
        if(nextHearingDate)
            hearing.nextHearingDate=nextHearingDate
        const createdHearing=await Hearing.create(hearing)
        res.status(201).json(createdHearing)
    } catch (error) {
        console.log("error in creating case hearing",error)
        res.status(500).json({
      message: "create hearing failed",
      error: error.message,
    });
    }
})

export default route