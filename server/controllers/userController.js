import express from "express";
import User from "../models/User.js";
import verifyToken from '../middlewares/VerifyToken.js'

const userController= express.Router();
userController.put('/edit-dp',verifyToken,async(req,res)=>{
    const {imgLink}=req.body;

    try {
        const userId= req.user.id;
        const updatedUser= await User.findByIdAndUpdate(userId,{imgLink},{new:true});
        return res.status(200).json({msg:"profile pic updated", updatedUser})
    } catch (error) {
        return res.status(500).json({msg:"server error"})
    }
})

export default userController;