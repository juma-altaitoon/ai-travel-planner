import express from 'express';
import auth from '../controllers/authController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const authrouter = express.Router();

// Connecting routes to endpoints
// Public routes
authRouter.post("/signup", auth.signup)
authRouter.post("/login", auth.login);
// authRouter.post("/forgot-password", auth.forgotpassword);
// authRouter.post("/reset-password", auth.resetPassword);

// Protected routes
authRouter.post("/logout", auth.logout);

