import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());


// MongoDB Connection
connectMongoDB();
process.on("SIGINT", async() => {
    console.log("Shutting down server...");
    await mongoose.connection.close()
})

// Server Connection
app.listen(PORT, console.log(`Server listening on Port: ${PORT}`));