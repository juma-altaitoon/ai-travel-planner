import User from '../models/User.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

// Protected fields to exclude from user profile
const protectedFields = ["-password", "-role", "-resetToken", "-resetTokenExpiry", "-__v"]
// Retrieve user profile
export const getProfile = async (req, res) => {
    try { 
        const userId = req.user;
        const user = await User.findById(userId).select(protectedFields)
        return res.status(200).json({ message: "User profile sent successfully.", user })
    } catch (error) {
        console.error("Error fetching user profile: ", error);
        return res.status(500).json({ message: "Error fetching user profile.", error: error.message });
    }
}

// Update user profile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user;

        // const avatar = req.file ? `uploads/avatars/${req.file.filename}` : null;
        const { 
            username,  
            firstName,
            lastName,
            dateOfBirth,
            country,
            avatar,
            avatarPubId
        } = req.body;
    
        const user = await User.findById(userId).select("avatarPubId");
        
        // Remove old avatar from cloudinary storage 
        const oldAvatar = user.avatarPubId || null;
        if(oldAvatar && avatar) {
            await cloudinary.uploader.destroy(user.avatarPubId, {
                resource_type: 'image',
                invalidate: true,
                });
        }
        
        const updateUser = await User.findByIdAndUpdate(
                userId, 
                {
                    username,  
                    firstName,
                    lastName,
                    dateOfBirth,
                    country,
                    avatar,
                    avatarPubId
                },
                { new: true }
            ).select(protectedFields);
        if (!updateUser) {
            return res.status(404).json({ message: "Profile update failed." });
        }
        // if (avatar && oldAvatar){
        //     const fullPath = path.join(__dirname,'..', oldAvatar);
        //     fs.unlink(fullPath, (error) => {
        //         if (error) {
        //             console.error("Failed to delete old avatar: ", oldAvatar, ". Error: ", error);
        //         }
        //     });
        // }
        return res.status(200).json({ message: "Profile update successful.", user: updateUser })
        
    } catch (error) {
        console.error("Error updating user profile: ", error);
        return res.status(500).json({ message: "Error updating user profile.", error: error.message });
    }
}

export default { getProfile, updateProfile };