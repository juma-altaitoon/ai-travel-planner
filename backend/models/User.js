import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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
    yearOfBirth: {
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
        default: " ",
    },
    role: {
        type: String,
        enum: [ 'user', 'admin' ],
        default: 'user',
    },
}, {timestamps: true}
);

// Password Hashing
userSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
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

    const secret = process.env.JWT
    const options = {
        expireIn: process.env.JWT_EXPIRY || '1h',
    }
    const token = jwt.sign(payload, secret, options);
    return token;
    
}