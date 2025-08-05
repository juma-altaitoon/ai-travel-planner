import express from 'express';
import user from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
// import { uploadAvatar } from '../middleware/multerMiddleware.js';

const userRouter = express.Router();

// Protected routes
userRouter.get("/profile", authenticate, user.getProfile);
userRouter.put("/update", authenticate, user.updateProfile);


export default userRouter;