import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateSingle } from "../constants/generateRes.js";
const authController = express.Router();

authController.post("/register", async (req, res) => {
  try {
    const isExisting = await User.findOne({ email: req.body.email });
    if (isExisting) {
      throw new Error(
        "An account with this email already exists, Please Log in"
      );
    }
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({ ...req.body, password: hashedPass });

    const { password, profilePic, ...others } = newUser._doc;
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    return res.status(201).json({ user: others, token });
  } catch (error) {
    return res.status(500).json(error);
  }
});

authController.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const comparePass = await bcrypt.compare(req.body.password, user.password);
    if (!comparePass) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { password, profilePic, ...others } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ user: others, token });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
});

export default authController;
