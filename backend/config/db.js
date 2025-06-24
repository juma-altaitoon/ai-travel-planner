import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MongoDB_URI)
        .then(() => {
            console.log('Connected to MongoDB.')
        })
        .catch((error) => {
            console.error("MongoDB connection error: ", error)
        })
    } catch (error) {
        console.error("ailed to connect to MongoDB: ", error);
        process.exit(1);
    }
}