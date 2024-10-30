import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import verifyToken from "../middlewares/VerifyToken.js";
import dotenv from "dotenv";
import Chat from "../models/Chat.js";
import UserChat from "../models/Userchats.js";
import generateResponse from "../constants/generateRes.js";
dotenv.config();

const chatController = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

chatController.post("/chat", verifyToken, async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id;

  try {
    // Step 1: Create a new chat history entry with user's message
    const newChat = new Chat({
      userId: userId,
      history: [{ role: "user", parts: [{ text: message }] }],
    });

    // Step 2: Generate response using the chat history
    const assistantResponse = await generateResponse(newChat.history, message);

    // Step 3: Append assistant response to chat history
    newChat.history.push({
      role: "model",
      parts: [{ text: assistantResponse }],
    });

    // Save chat document to Chat collection
    const savedChat = await newChat.save();

    // Step 4: Update or create UserChats document
    let userChats = await UserChat.findOne({ userId: userId });
    const chatEntry = {
      chatId: savedChat._id,
      title: message.substring(0, 20),
    };

    if (!userChats) {
      userChats = new UserChat({
        userId: userId,
        chats: [chatEntry],
      });
      await userChats.save();
    } else {
      await UserChat.updateOne(
        { userId: userId },
        { $push: { chats: chatEntry } }
      );
    }

    res.status(201).send(savedChat);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating chat!");
  }
});

chatController.post("/chat/:chatId", verifyToken, async (req, res) => {
  const { message } = req.body;
  const { chatId } = req.params;
  const userId = req.user.id;

  try {
    const chatHistory = await Chat.findOne({ _id: chatId, userId: userId });
    if (!chatHistory) return res.status(404).send("Chat not found");

    chatHistory.history.push({ role: "user", parts: [{ text: message }] });
    const assistantResponse = await generateResponse(
      chatHistory.history,
      message
    );
    chatHistory.history.push({
      role: "model",
      parts: [{ text: assistantResponse }],
    });
    const updatedChat = await chatHistory.save();

    res.status(200).json(updatedChat);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error continuing chat!");
  }
});

chatController.delete("/chat/:chatId", verifyToken, async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }

    if (chat.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: "You can only delete your own chats" });
    }

    await Chat.findByIdAndDelete(chatId);

    await UserChat.updateOne(
      { userId: req.user.id },
      { $pull: { chats: { chatId: chatId } } }
    );

    res.status(200).json({ msg: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

chatController.get("/getUserchats", verifyToken, async (req, res) => {
  try {
    const userID = req.user.id;
    const userchats = await UserChat.findOne({ userId: userID }).populate(
      "chats.chatId"
    );
    if (!userchats) {
      return res.status(200).json({ chats: [] });
    }
    const chatData = userchats.chats.map((chat) => ({
      title: chat.title,
      chatId: chat._id,
    }));
    return res.status(200).json({ chat: chatData });
  } catch (error) {
    return res.status(500).json({ msg: "failed to get chats" });
  }
});

chatController.get("/getsingle/:id", verifyToken, async (req, res) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);
    return res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve chat", error });
  }
});

export default chatController;
