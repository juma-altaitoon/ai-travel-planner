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
}, { timestamps: true, _id: false });

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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Itinerary",
    },
})

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;