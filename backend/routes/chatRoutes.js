import express from 'express';
import chat from '../controllers/chatController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const chatRouter = express.Router();

// Protected Routes
chatRouter.get("/create", authenticate, chat.createChat);
chatRouter.post("/itinerary", authenticate, chat.createItineraryChat);
chatRouter.post("/id", authenticate, chat.getChat);
chatRouter.post("/itinerary-chat", authenticate, chat.getItineraryChat);
chatRouter.get("/list", authenticate, chat.getChatList);
chatRouter.post("/send", authenticate, chat.postMessage);
chatRouter.delete("delete", authenticate, chat.deleteChat);

export default chatRouter;