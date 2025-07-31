import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        minlength: 4,
        maxlength: 20,
    
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    
    },
    password: {
        type: String,
        required: true,
        minlength: 12,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,

    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        
    },
    dateOfBirth: {
        type: Date,
    },
    country: {
        type: String,
        trim: true,
        maxlength: 50,
    },
    avatar: {
        type: String,
        trim: true,
        default: null,
    },
    role: {
        type: String,
        enum: [ 'user', 'admin' ],
        default: 'user',
    },
    resetToken: {
        type: String,
        default: ""
    },
    resetTokenExpiry: {
        type: Date,
        default: null,
    }
}, {timestamps: true}
);

// Password Hashing
userSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
})

// Password Comparison
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//  JWT Generation
userSchema.methods.generateJWT = async function() {
    const payload = {
        id : this._id,
        username: this.username,
    }

    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: process.env.JWT_EXPIRY || '1h',
    }
    const token = jwt.sign(payload, secret, options);
    return token;
    
}

// Generate Password Reset Token
userSchema.methods.generateResetToken = async function() {
    // Generate a random token using crypto module
    const token = crypto.randomBytes(32).toString('hex');
    // Hash the token and save. (similar concept to password hashing)
    this.resetToken = crypto.createHash("sha256").update(token).digest("hex");
    // Set Reset Token Expiry 
    this.resetTokenExpiry = (Date.now() + 1200000); // 20 minutes
    // token is returned
    return token;
}

const User = mongoose.model('User', userSchema);
export default User;