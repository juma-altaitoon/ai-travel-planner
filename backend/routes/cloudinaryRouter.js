import express from 'express';
import { getSignedUpload } from '../controllers/cloudinary.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const cloudinaryRouter = express.Router();

// Protected routes
cloudinaryRouter.get("/sign-upload", getSignedUpload);

export default cloudinaryRouter;