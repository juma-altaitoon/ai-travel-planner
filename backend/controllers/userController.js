import User from '../models/User.js';

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
        const { 
            username,  
            firstName,
            lastName,
            yearOfBirth,
            country,
            avatar,
        } = req.body;
    

        const updateUser = await User.findByIdAndUpdate(
            userId, 
            {
                username,  
                firstName,
                lastName,
                yearOfBirth,
                country,
                avatar,
            }
        ).select(protectedFields)
        if (!updateUser) {
            return res.status(404).json({ message: "Profile update failed." });
        }
        return res.status(200).json({ message: "Profile update successful.", user: updateUser })
        
    } catch (error) {
        console.error("Error updating user profile: ", error);
        return res.status(500).json({ message: "Error updating user profile.", error: error.message });
    }
}

export default { getProfile, updateProfile };