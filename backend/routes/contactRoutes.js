import contact from "../controllers/contactController.js";
import express from 'express';

const contactRouter = express.Router();

// Public Route
contactRouter.post('/send', contact.newMessage);


export default contactRouter;