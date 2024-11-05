import express from "express";
import User from "../models/User.js";
import verifyToken from '../middlewares/VerifyToken.js'

const userController= express.Router();
userController.put('/editUser',verifyToken,async(req,res)=>{
    const {imgLink, description}=req.body;
    try {
        const userId= req.user.id;
        const updatedUser= await User.findByIdAndUpdate(userId,{imgLink, description},{new:true});
        const {password,...others}=updatedUser._doc;
        return res.status(200).json({msg:"userinfo updated", user: others})
    } catch (error) {
        return res.status(500).json({msg:"server error"})
    }
})

export default userController;