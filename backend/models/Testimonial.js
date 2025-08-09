import { timeStamp } from 'console';
import mongoose from 'mongoose';
import { type } from 'os';

const testimonialSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    username: {
        type: String,
        required: true,    
    },
    avatar: {
        type: String,
        reuired: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    destination: {
        type: String,
        trim: true,
        maxlength: 150,
    },
    publish: {
        type: Boolean,
        default: false,
    },
}, {timeStamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;