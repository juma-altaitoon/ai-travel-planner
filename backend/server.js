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
import ratelimit from 'express-rate-limit';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [process.env.FRONTEND_URL, process.env.BASE_URL ] || null;
const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin, process.env.FRONTEND_URL, process.env.BASE_URL )
        if(allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            console.error("Blocked by CORS: ", origin)
            callback(new Error("Not Allowed by CORS"));
        }
    },
    credentials: true,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const limiter = ratelimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, // Limit of requests from each IP per windowMs
    message: "To many requests, please try again later."
})

// Use morgan middleware for logging requests to the server
if (process.env.NODE_ENV === 'development') {
    // Logs concise information for development
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    // Lpgs detailed information for production
    app.use(morgan('combined'));
}
// Middleware
app.use(cors(corsOptions));
app.options('*', corsOptions)
app.use(express.json());
app.use(helmet({
    // allow images/fonts from other origin
    crossOriginResourcePolicy: false
}));
app.use(cookieParser());
app.use('/uploads',(req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
}, express.static(path.join(__dirname,'uploads')))

// Routes
app.get('/', (req, res) => {
    res.send("Hello, World!")
});
app.use('/auth', limiter, authRouter);
app.use('/user', limiter, userRouter);
app.use('/itinerary', limiter, itineraryRouter);
app.use('/chat', limiter, chatRouter);
app.use(notFound);
app.use(errorHandler);

// MongoDB Connection
connectMongoDB();
process.on("SIGINT", async() => {
    console.log("Shutting down server...");
    await mongoose.connection.close()
})

// Server Connection
app.listen(PORT, console.log(`Server listening on Port: ${PORT}`));