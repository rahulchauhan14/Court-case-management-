import jwt from "jsonwebtoken";

export const protect=(req,res,next)=>{
    const token=req.cookies.jwt
    if(!token)
        return res.status(401).json({messaage:"no token"})

    try {
        req.user=jwt.verify(token,process.env.JWT_SECRET)
        next()
    } catch (error) {
        res.status(404).json({message:"invalid token"})
    }
}