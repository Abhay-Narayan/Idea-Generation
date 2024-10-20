import express from "express";
import mongoose from "mongoose";
import connect from "./db.js";
import dotenv from "dotenv";
import authController from "./controllers/authController.js";

dotenv.config();
mongoose.set("strictQuery", false);
connect();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth", authController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
