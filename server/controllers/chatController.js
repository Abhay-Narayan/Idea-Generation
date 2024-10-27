import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import verifyToken from "../middlewares/VerifyToken.js";
import dotenv from "dotenv";
dotenv.config();

const chatController = express.Router();
const genAI=new GoogleGenerativeAI(process.env.GOOGLE_API);
const model=genAI.getGenerativeModel({model:"gemini-1.5-flash"});


let conversationCache={};

chatController.post('/chat',verifyToken, async(req,res)=>{
    const {message}=req.body;
    const userId=req.user.id;
    if (!conversationCache[userId]) {
        conversationCache[userId] = [];
      }
    
    conversationCache[userId].push({role:'user', content:message});

    const context = conversationCache[userId]
    .map((entry) => `${entry.role}: ${entry.content}`)
    .join('\n');

    const prompt = `Imagine you are an assitant or project partner you have to discuss the particular idea with the user which user will tell you , you have to talk about the pros, cons and the future scope of the particular idea also discuss the potential of the idea in detail, answer formally and technicaly with proper logic in the context of the conversation which i will provide you. Below is the conversation:\n${context}\n provide the appropriate response.`;

    try {
        const result = await model.generateContent(prompt);
        const aiResponse =result.response.text();

        conversationCache[userId].push({role:'assistant', content:aiResponse});
        return res.json({ aiResponse: aiResponse });

    } catch (error) {
        console.error('Error generating response from Google Gemini:', error);
        res.status(500).json({ error: 'Failed to process the message' });
    }
})

chatController.post('/clear', (req, res) => {
    const { userId } = req.body;
    if (conversationCache[userId]) {
      delete conversationCache[userId];
    }
    res.sendStatus(200);
  });

export default chatController;
