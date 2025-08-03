import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        
        console.log('Connected to MongoDB.')
        
         // Connection logging
        mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
        });

        mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected');
        });

    } catch (error) {
        console.error("Failed to connect to MongoDB: ", error);
        process.exit(1);
    }
}

export default connectMongoDB;