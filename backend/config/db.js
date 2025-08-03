import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongoDB = async() => {
    try {
        // console.log(process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI)
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

export default connectMongoDB;