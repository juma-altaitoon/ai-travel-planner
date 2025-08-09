import contact from "../controllers/contactController";
import express from 'express';

const contactRouter = express.Router();

// Public Route
contactRouter.post('/send', contact.newMessage);

// Admin Route
contactRouter.get("/", contact.getAllMessages);
contactRouter.put("/read", contact.readMessage);
contactRouter.post("/delete", contact.deleteMessage);


export default contactRouter;