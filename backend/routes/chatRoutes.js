import express from 'express';
import chat from '../controllers/chatController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const chatRouter = express.Router();

// Protected Routes
chatRouter.post("/create", authenticate, chat.createChat);
chatRouter.get("/id", authenticate, chat.getChat);
chatRouter.get("/list", authenticate, chat.getChatList);
chatRouter.post("/send", authenticate, chat.postMessage);
chatRouter.delete("delete", authenticate, chat.deleteChat);

export default chatRouter;