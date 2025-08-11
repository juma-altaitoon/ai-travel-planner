import Chat from "../models/Chat.js";
import Itinerary from "../models/Itinerary.js";
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
            Personalize your advice and answer user questions clearly and accurately`
        const chatMessage = { role: "system", content: systemMessage };
        const chat = await Chat.create({ messages: [ chatMessage ], user: user, itinerary: false });
        // console.log(chat)

        return res.status(201).json({ message :"Chat created." , chatId: chat.id });
    } catch (error) {
        console.error( "Error creating chat", error.message );
        return res.status(500).json({ message: "Error creating chat", error: error.message });
    }
}

export const createItineraryChat = async (req, res) => {
    try {
        const user = req.user;
        const itinerary = req.body;
        const systemMessage = 
            `You are an expert travel advisor helping users plan personalized trips.
            Your goal is to suggest day-by-day activities, places to visit, and travel tips based on their itinerary.
            Here is the user's generated itinerary in JSON:
            ${JSON.stringify(itinerary)}
            Use this context to personalize your advice and answer user questions clearly and accurately.`
        const chatMessage = { role: "system", content: systemMessage };
        
        const chat = await Chat.create({ messages: [ chatMessage ], user: user });
        return res.status(201).json({ message :"Chat created." , chatId: chat.id });
    } catch (error) {
        console.error( "Error creating chat", error.message );
        return res.status(500).json({ message: "Error creating chat", error: error.message });
    }

}

export const getGeneralChatId = async (req, res) => {
    const userId = req.user;
    try {
        const chat = await Chat.findOne({ user: userId, itinerary: false }).select("id");
        if (!chat){
            return res.status(404).json({ message: "Chat sessions not found" });
        }
        // console.log(chat.id)
        return res.status(200).json({ message: "Chat sessions found", chatId: chat.id  });
    } catch (error) {
        console.error("Failed to fetch chat list: ", error.message );
        return res.status(500).json({ message: "Failed to fetch chat list: ", error: error.message });
    }
}

export const getChat = async (req, res) => {
    const { chatId } = req.body;
    // console.log(chatId)
    try {
        const chat = await Chat.findById(chatId);
        if (!chat){
            return res.status(404).json({ message: "Chat session not found" });
        }
        return res.status(200).json({ message: "Chat session found", history: chat.messages  });
    } catch (error) {
        console.error("Failed to fetch chat1: ", error.message );
        return res.status(500).json({ message: "Failed to fetch chat1: ", error: error.message });
    }
}

export const getItineraryChatId = async (req, res) => {
    // console.log(req.body)
    const { itineraryId }  = req.body;
    try {
        const chat = await Itinerary.findById(itineraryId).select("chat");

        if (!chat){
            return res.status(404).json({ message: "Chat session not found" });
        }
        return res.status(200).json({ message: "Chat session found", chatId: chat.chat });
    } catch (error) {
        console.error("Failed to fetch chat2: ", error );
        return res.status(500).json({ message: "Failed to fetch chat2: ", error: error });
    }
}

export const postMessage = async ( req, res) => {
    const { chatId, prompt } = req.body;
    if (!chatId || !prompt) {
        return res.status(400).json({message: "Missing prompt and/or chatId" });
    }
    try {
        const chat = await Chat.findById(chatId);
        if (!chat){
            return res.status(404).json({ message: "Chat session not found" });
        }
        // update messeges with user's prompt
        chat.messages.push({ role: "user", content: prompt });
        // call AI API 

        const completion = await client.chat.completions.create({
            model: "openai/gpt-4.1-mini",
            // instructions: "You are an experienced helpful travel consultant",
            messages: chat.messages,
            temperature: 0.7,
            max_completion_tokens: 150,
        })

        const response = completion.choices[0]?.message?.content.trim();       
        
        // update messages with AI's reponse
        chat.messages.push({ role: "assistant", content: response })

        await chat.save();
        return res.status(200).json({ reply: response })
    } catch (error) {
        console.error("Failed to process message ", error.message );
        return res.status(500).json({ message: "Failed to process message: ", error: error.message });
    }
}

export const deleteChat = async (req, res) => {
    const { chatId } = req.body;
    
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
};



export default {createChat, createItineraryChat, getChat, getItineraryChatId, getGeneralChatId, postMessage, deleteChat};
