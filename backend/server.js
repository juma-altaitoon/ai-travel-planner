import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectMongoDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import itineraryRouter from './routes/itineraryRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname,'uploads')))

// Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/itinerary', itineraryRouter);
app.use('/chat', chatRouter)

// MongoDB Connection
connectMongoDB();
process.on("SIGINT", async() => {
    console.log("Shutting down server...");
    await mongoose.connection.close()
})

// Server Connection
app.listen(PORT, console.log(`Server listening on Port: ${PORT}`));