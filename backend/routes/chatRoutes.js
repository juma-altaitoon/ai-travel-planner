import express from 'express';
import chat from '../controllers/chatController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const chatRouter = express.Router();

// Protected Routes
chatRouter.get("/create", authenticate, chat.createChat);
chatRouter.post("/itinerary", authenticate, chat.createItineraryChat);
chatRouter.post("/id", authenticate, chat.getChat);
chatRouter.post("/itineraryId", authenticate, chat.getItineraryChatId);
chatRouter.get("/chatId", authenticate, chat.getGeneralChatId);
chatRouter.post("/send", authenticate, chat.postMessage);
chatRouter.post("/delete", authenticate, chat.deleteChat);

export default chatRouter;