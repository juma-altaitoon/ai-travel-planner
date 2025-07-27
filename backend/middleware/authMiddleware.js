import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

// Check user authentication (valid JWT)
export const authenticate = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access." });
    }
    try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = user.id;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            console.error("Token expired. ", error);
            return res.status(401).json({ message: "Token expired. Please Login again.", error: error.message})
        }
        console.error(" Authentication error: ", error);
        return res.status(401).json({ message: "Invalid token. Please login.", error: error.message });
        
    }
}

// Check user authorization (RBAC)
export const authorize = (...allowedRoles) => {
    return async (req, res, next) => {
        // Retrieve user role using user ID stored in req.user
        userRole = await User.findById(req.user).select('role');
        if (!req.user || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Forbidden access." })
        }   
        next();            
    };
}


export default {authenticate, authorize }
