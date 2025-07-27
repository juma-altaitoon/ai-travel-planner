import mongoose from 'mongoose';
import { randomUUID } from "crypto";

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: [ "user", "assistant", "system" ],
        required: true,
    },
    content: {
        type: String,
        required: true
    }
}, { _id: false });

const chatSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
        default: () => randomUUID(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    messages: {
        type: [ messageSchema ],
        default: [],
    },
    itinerary: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: true })

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;