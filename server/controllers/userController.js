import express from "express";
import User from "../models/User.js";
import verifyToken from '../middlewares/VerifyToken.js'
import axios from 'axios'
import multer from 'multer'
const upload = multer({ storage: multer.memoryStorage() });

const userController= express.Router();
userController.put('/editUser', verifyToken, async (req, res) => {
    const {  description, username } = req.body;
    try {
        const userId = req.user.id;

        const updateFields = {};
        if (description !== undefined) updateFields.description = description;
        if (username !== undefined) updateFields.username = username;

        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
        const { password, ...others } = updatedUser._doc;
        
        return res.status(200).json({ msg: "User info updated", user: others });
    } catch (error) {
        return res.status(500).json({ msg: "Server error" });
    }
});

userController.post('/upload-dp', verifyToken ,upload.single('profilePic'),async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
          }
        const userId = req.user.id;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
              profilePic: {
                data: req.file.buffer,            // File buffer from multer
                contentType: req.file.mimetype,    // MIME type of the image
              },
            },
            { new: true }
        );
        const { password, ...others } = updatedUser._doc;
        return res.status(200).json({ msg: 'Profile picture updated', user: others });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
    return res.status(500).json({ msg: 'Server error', error });
    }
})

userController.get('/get-profile-pic', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (user && user.profilePic && user.profilePic.data) {
        const base64Image = user.profilePic.data.toString('base64');
        const imageUrl = `data:${user.profilePic.contentType};base64,${base64Image}`;
        return res.status(200).json({ profilePic: imageUrl });
      } else {
        return res.status(404).json({ msg: 'No profile picture found' });
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      return res.status(500).json({ msg: 'Server error', error });
    }
  });

userController.get('/getSingle/:id',async(req,res)=>{
  try {
    const userId=req.params.id;
    const user=await User.findById(userId);
    const {username, description}=user._doc;
    return res.status(200).json({username,description});
  } catch (error) {
    
  }
})

export default userController;