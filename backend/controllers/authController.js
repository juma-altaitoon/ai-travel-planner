import User from '../models/User.js';

// Signup 
export const signup = async (req, res) => {
    try {
        const { 
            username, 
            email, 
            password,
            firstName,
            lastName,
            yearOfBirth,
            country,
            avatar,
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
            yearOfBirth,
            country,
            avatar,
        })
        await user.save()
        .then((savedUser) => {
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
        const token = await user.generateAuthToken();
        // Save the token in a cookie
        res.cookie(
            "JWT", 
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
    res.clearCookie("JWT");
    res.status(200).json({ message: "Logout successful." })
}

export default { signup, login, logout,  };