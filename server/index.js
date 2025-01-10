import express from "express";
import mongoose from "mongoose";
import connect from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
import authController from "./controllers/authController.js";
import blogController from "./controllers/blogController.js";
import chatController from "./controllers/chatController.js";
import userController from "./controllers/userController.js";

dotenv.config();
mongoose.set("strictQuery", false);
connect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://kreativweb.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());

app.use("/auth", authController);
app.use("/blog", blogController);
app.use("/bot", chatController);
app.use("/user", userController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
