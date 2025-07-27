import mongoose from 'mongoose';

// Itinerary Day Schema
const iDaySchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    morning: { 
        activity: { type: String },
        location: { type: String },
        description: { type: String },
        link: { type: String },
        youtubeLink: { type: String },
        cost: { type: Number },
    },
    afternoon: { 
        activity: { type: String },
        location: { type: String },
        description: { type: String },
        link: { type: String },
        youtubeLink: { type: String },
        cost: { type: Number },
    },
    evening: { 
        activity: { type: String },
        location: { type: String },
        description: { type: String },
        link: { type: String },
        youtubeLink: { type: String },
        cost: { type: Number },
    },
    transport: {
        type: [String],
        default: [],
    },
    notes: {
        type: String,
        default: '',
    },
}, { _id: false });

// Itinerary Schema
const itinerarySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    preferences: {
        type: [String],
        default: [],
    },
    additionalRequest: {
        type: String,
        default: '',
    },
    itineraryDays: {
        type: [iDaySchema],
        default: [],
    },
    summary: {
        type: String,
        default: '',
    },
    budget: {
        type: String,
        enum: [ 'low', 'mid', 'high' ],
    },
    friendlyOneLiner: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const Itinerary = mongoose.model("Itinerary", itinerarySchema);
export default Itinerary;