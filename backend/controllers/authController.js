import User from '../models/User.js';
import crypto from 'crypto';
import { sendWelcomeEmail, sendResetPassword } from '../util/sendEmail.js';

const FRONTEND_URL = process.env.FRONTEND_URL;

// Test API
export const checkAuth = async (req, res) => {
    // console.log(req.user);
    const userId = req.user;
    if (!req.user){
        return res.status(401).json({ message: "Unauthorized access."})
    }
    try {
        const user = await User.findById(userId).select(["_id", "username"]);
        return res.status(200).json({ message: "API is working.", user});
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized access.", error: error.message});
    }
    
}

// Signup 
export const signup = async (req, res) => {
    try {
        console.log("req.file", req.file)
        console.log("req.body: ", req.body);
        const avatar = req.file ? `uploads/avatars/${req.file.filename}` : null;
        
        const { 
            username, 
            email, 
            password,
            firstName,
            lastName,
            dateOfBirth,
            country,
        } = req.body;

        // Check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists."});
            throw new Error("User already exists.");
        }

        const user = new User({
            username, 
            email, 
            password,
            firstName,
            lastName,
            dateOfBirth,
            country,
            avatar,
        })
        await user.save()
        .then((savedUser) => {
            console.log(savedUser.email, savedUser.username);
            sendWelcomeEmail(savedUser.email, savedUser.username);
            res.status(201).json({ message: "User successfully registered.", savedUser});
        })
        .catch ((error) => {
            res.status(500).json({ message: "Invalid user data.", error: error.message})
        })
    } catch (error) {
        console.error("Error registering user. ", error);
    }
}

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    if ( !email || !password ) {
        return res.status(400).json({ message: "All fields are required." }); 
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            console.log("Invalid user credentials.");
            return res.status(401).json({ message: "Invalid user credentials" });
        }
        const token = await user.generateJWT();
        // Save the token in a cookie
        res.cookie(
            "jwt", 
            token, 
            {
                maxAge: 60 * 60 * 1000, // 1 hour
                httpOnly: true,
                sameSite: "Strict",
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            }
        );
        res.status(200).json({ message: "Login successful.", user: user._id});
    } catch (error) {
        console.error("Login error: ", error);
        res.status(500).json({ message: "Server error. Please try again later.", error: error.message });
    }
}

// Logout
export const logout = async (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful." })
}

// Forgot Password
export const forgotPassword = async (req, res) => {
    console.log(req.body)
    const { email } = req.body;
    // console.log(email);
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message : "User not found." });
    }

    const resetToken = await user.generateResetToken();
    
    await user.save()
        .then((savedUser) => {
            const resetURL = `${FRONTEND_URL}/reset/${resetToken}`;
            // API test
            console.log(savedUser.email, savedUser.username, resetURL);
            sendResetPassword(savedUser.email, savedUser.username, resetURL)
            return res.status(200).json({ message: "Reset Link sent" });

        })
        .catch((error) => {
            console.error("Error setting reset token: ", error.message);
            return res.status(500).json({ message: "Error setting reset token.", error: error.message });
        })
}

// Reset/Update Password
export const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest('hex');
    try {
        const user = await User.findOne({ 
            resetToken: resetTokenHash, 
            resetTokenExpiry: { $gt: Date.now() }, 
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid Token." });
        }
        user.password = newPassword;
        user.resetToken = undefined;
        user.reserTokenExpiry = undefined;
        await user.save(). then(() => {
            return res.status(200).json({ message: "Password Reset successful."});
        })
        .catch((error) => {
            console.error("Password Reset Failed: ", error.message);
            return res.status(500).json({ message: "Password Reset Failed.", error: error.message });
        })
    } catch (error) {
        console.error("Error resetting password: ", error.message);
        return res.status(500).json({ message: "Error resetting password.", error: error.message });
    }    
}

// Exporting the functions
export default { signup, login, logout, forgotPassword, resetPassword, checkAuth };
