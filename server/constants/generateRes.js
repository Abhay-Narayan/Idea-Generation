import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateResponse = async (userhistory, message) => {
    // Ensure only role and text are included in history entries
    const formattedHistory = userhistory.map(entry => ({
        role: entry.role,
        parts: entry.parts.map(part => ({ text: part.text }))
    }));

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);
    return result.response.text();
}


export default generateResponse;