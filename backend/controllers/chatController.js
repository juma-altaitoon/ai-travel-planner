import Chat from "../models/Chat.js";
import OpenAI from "openai";
import dotenv from 'dotenv';


dotenv.config()

// Initialize OpenAI client
const client = new OpenAI({
        baseURL: process.env.OPENAI_ENDPOINT,
        apiKey: process.env.GITHUB_TOKEN,
    });

export const createChat = async (req, res) => {
    try {
        const user = req.user;
                
        const systemMessage = 
        `You are an expert travel advisor helping users plan personalized trips.
        Your goal is to suggest day-by-day activities, places to visit, and travel tips based on a user's input.            
        Personalize your advice and answer user questions clearly and accurately
        `
        const chatMessage = { role: "system", content: systemMessage };
        const chat = await Chat.create({ messages: [ chatMessage ], user: user });
        console.log(chat)

        return res.status(201).json({ message :"Chat created." , sessionId: chat.sessionId });
    } catch (error) {
        console.error( "Error creating chat", error.message );
        return res.status(500).json({ message: "Error creating chat", error: error.message });
    }

}

export const createItineraryChat = async (req, res) => {
    try {
        const user = req.user;
        const itinerary = req.body;
        
        const systemMessage = `
            You are an expert travel advisor helping users plan personalized trips.
            Your goal is to suggest day-by-day activities, places to visit, and travel tips based on their itinerary.
            Here is the user's generated itinerary in JSON:
            ${itinerary}
                        
            Use this context to personalize your advice and answer user questions clearly and accurately
        `
        const chatMessage = { role: "system", content: systemMessage };
        
        const chat = await Chat.create({ messages: [ chatMessage ], user: user, itinerary: itinerary._id });
        
        return res.status(201).json({ message :"Chat created." , sessionId: chat.sessionId });
    } catch (error) {
        console.error( "Error creating chat", error.message );
        return res.status(500).json({ message: "Error creating chat", error: error.message });
    }

}

export const getChatList = async (req, res) => {
    const userId = req.body;
    try {
        const chatList = await Chat.find({ userId });
        if (!chatList){
            return res.status(404).json({ message: "Chat sessions not found" });
        }
        console.log(chatList)
        return res.status(200).json({ message: "Chat sessions found", chatList  });
    } catch (error) {
        console.error("Failed to fetch chat list: ", error.message );
        return res.status(500).json({ message: "Failed to fetch chat list: ", error: error.message });
    }
}

export const getChat = async (req, res) => {
    const { sessionId } = req.body;
    try {
        const session = await Chat.findOne({ sessionId, user: req.user });
        if (!session){
            return res.status(404).json({ message: "Chat session not found" });
        }
        return res.status(200).json({ message: "Chat session found", session  });
    } catch (error) {
        console.error("Failed to fetch chat: ", error.message );
        return res.status(500).json({ message: "Failed to fetch chat: ", error: error.message });
    }
}

export const getItineraryChat = async (req, res) => {
    const { itineraryId } = req.body;
    console(typeof(itineraryId))
    try {
        const session = await Chat.findOne({ itinerary: itineraryId, user: req.user });
        if (!session){
            return res.status(404).json({ message: "Chat session not found" });
        }
        return res.status(200).json({ message: "Chat session found", sessionId: session.sessionId  });
    } catch (error) {
        console.error("Failed to fetch chat: ", error.message );
        return res.status(500).json({ message: "Failed to fetch chat: ", error: error.message });
    }
}

export const postMessage = async ( req, res) => {
    const { sessionId, prompt } = req.body;
    if (!sessionId || !prompt) {
        return res.status(400).json({message: "Missing prompt and/or sessionId" });
    }
    try {
        const session = await Chat.findOne({ sessionId, user: req.user });
        if (!session){
            return res.status(404).json({ message: "Chat session not found" });
        }
        // update messeges with user's prompt
        session.messages.push({ role: "user", content: prompt });
        // call AI API 
        console.log("Session : ", session.messages)

        const completion = await client.chat.completions.create({
            model: "openai/gpt-4.1-mini",
            // instructions: "You are an experienced helpful travel consultant",
            messages: session.messages,
            temperature: 0.7,
            max_completion_tokens: 150,
        })

        const response = completion.choices[0]?.message?.content.trim();       
        
        // update messages with AI's reponse
        session.messages.push({ role: "assistant", content: response })

        await session.save();
        return res.status(200).json({ reply: response })
    } catch (error) {
        console.error("Failed to process message ", error.message );
        return res.status(500).json({ message: "Failed to process message: ", error: error.message });
    }
}

export const deleteChat = async (req, res) => {
    const chatId = req.body;
    
    try {
        await Chat.findByIdAndDelete( chatId )
            .then(() => {
                return res.status(200).json({ message: "Chat delete successful" })
            })
            .catch((error) => {
                console.error("Chat delete error: ", error.message);
                return res.status(500).json({ message: "Chat delete error.", error: error.message });
            })
    } catch (error) {
        console.error("Chat delete error: ", error.message);
        return res.status(500).json({ message: "Chat delete error.", error: error.message });
    } 
}


export default {createChat, createItineraryChat, getChat, getItineraryChat, getChatList, postMessage, deleteChat};
