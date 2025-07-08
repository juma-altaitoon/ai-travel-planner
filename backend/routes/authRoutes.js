import express from 'express';
import auth from '../controllers/authController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

// Connecting routes to endpoints
// Test route
authRouter.get("/check", authenticate, auth.checkAuth)
// Public routes
authRouter.post("/signup", auth.signup)
authRouter.post("/login", auth.login);
authRouter.post("/forgot-password", auth.forgotPassword);
authRouter.post("/reset-password", auth.resetPassword);

// Protected routes
authRouter.post("/logout", authenticate, auth.logout);

export default authRouter;
