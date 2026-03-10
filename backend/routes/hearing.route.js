import express from "express"
import { protect } from "../middlewares/auth.middleware.js"
import { authorize } from "../middlewares/authorize.middleware.js"
import Case from "../models/case.model.js"
import Hearing from "../models/hearing.model.js"
const route=express.Router()

route.get("/:caseId",protect,authorize("admin","clerk","lawyer","judge"),async function(req,res){
    try {
        const caseExist=await Case.findById({_id:req.params.caseId})
        if(!caseExist)
            return res.status(404).json({message:"case not found"})
        // if(req.user.role==="lawyer"&&req.user.id!==caseExist.lawyerId.toString())
        //     return res.status(403).json({message:"unauthorized"})
        if (req.user.role === "lawyer") {
    const isAssigned = caseExist.lawyerId && caseExist.lawyerId.toString() === req.user.id;
    if (!isAssigned) {
        return res.status(403).json({ message: "unauthorized" });
    }
}
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

route.post("/",protect,authorize("admin","clerk","judge"),async function(req,res){
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

// GET / - Get all hearings (filtered by role) sorted by date
route.get("/", protect, authorize("admin", "clerk", "lawyer","judge"), async (req, res) => {
    try {
        let query = {};

        // If the user is a lawyer, restrict to only their assigned cases
        if (req.user.role === "lawyer") {
            const myCases = await Case.find({ lawyerId: req.user.id }).select('_id');
            const myCaseIds = myCases.map(c => c._id);
            
            // Query only hearings where the caseId is in the lawyer's case list
            query.caseId = { $in: myCaseIds };
        }

        // Fetch hearings, populate the Case details, and sort by date ascending (upcoming first)
        const hearings = await Hearing.find(query)
            .populate("caseId", "caseNumber title status") 
            .sort({ date: 1 });

        res.json(hearings);
    } catch (error) {
        console.log("error fetching all hearings", error);
        res.status(500).json({
            message: "Failed to fetch hearing schedule",
            error: error.message,
        });
    }
});

export default route