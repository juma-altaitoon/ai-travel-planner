import Itinerary from '../models/Itinerary.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize OpenAI client
const client = new OpenAI({
        baseURL: process.env.OPENAI_ENDPOINT,
        apiKey: process.env.GITHUB_TOKEN,
    });

// GET all itineraries for a user
export const getItineraries = async (req, res) => {
    try {
        const userId = req.user;
        const itineraries = await Itinerary.find({ user: userId })
            .sort({ createdAt: -1 });
        if (!itineraries || itineraries.length === 0) {
            return res.status(404).json({ message: "No itineraries found." });
        }
        return res.status(200).json({ message: "Itineraries retrieved successfully", itineraries});
    } catch (error) {
        console.error("Error retrieving itineraries: ", error.message);
        return res.status(500).json({ message: "Error retrieving itineraries.", error: error.message });
    }
};

// GET itinerary by ID
export const getItineraryById = async (req, res) => {
    try {
        const id = req.body;
        const itinerary = await Itinerary.findById(id);
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found." });
        }
        return res.status(200).json({ message: "Itinerary retrieved successfully", itinerary});
    } catch (error) {
        console.error("Error retrieving itinerary: ", error.message);
        return res.status(500).json({ message: "Error retrieving itinerary.", error: error.message });
    }
};

// GenAI Test 
export const generateTest = async (req, res) => {
    
    try {
        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful travel assistant/advisor."},
                { role: "user", content: "Suggest 3 relaxing vacation destinations for mid level budget." },
            ],
            temperature: 1.0,
            top_p: 1.0,
            model: process.env.OPENAI_MODEL,
        })

        console.log("Response from OpenAI: ", response);
        return res.status(200).json({ message: "Test response.", response: response.choices[0].message.content })
    } catch (error) {
        console.error("Error generating test responses: ", error.message);
        return res.status(500).json({ message: "Error generating test responses.", error: error.message });
    }
}
// Generate a new itinerary
export const generateItinerary = async (req, res) => {
    const {
        country,
        city,
        startDate,
        endDate,
        duration,
        preferences,
        budget,
        additionalRequest,
    } = req.body;

    const systemMessage = `
    Role: You are an expert travel advisor. Your Job is to produce personalized, concise, day-by-day itineraries in strict JSON format, nothing else.
    
    Directive: Generate a detailed travel itinerary. Follow the Output Spicification exactly.
    
    Output Specification:
    - Output must strictly match this structure:
    {
        "friendlyOneLiner": "String
        "country": "String",
        "city": "String"
        "startDate": "YYYY-MM-DD",
        "endDate": "YYYY-MM-DD",
        "duration": Integer, 
        "preferences": ["String1", "String2",...],
        "budget": "low" | "mid" | "high",
        "additionalRequest": "String",
        "itinerary": [
            {
                "day": Integer,
                "date": "YYYY-MM-DD",
                "morning": {
                    "activity": "String",
                    "location": "String,
                    "description": "String",
                    "link": "String",
                    "youtubeLink":"String",
                    "cost": Float,
                },
                "afternoon": {
                    "activity": "String",
                    "location": "String,
                    "description": "String",
                    "link": "String",
                    "youtubeLink":"String",
                    "cost": Float,
                },
                "evening": {
                    "activity": "String",
                    "location": "String,
                    "description": "String",
                    "link": "String",
                    "youtubeLink":"String",
                    "cost": Float,
                },
                "transport": [ "String", "String", ... ],
                "notes": "String"
            },
            // ... repeat for each day
        ],
        "summary": "A 1-2 sentence overview of the trip flow."
    }
    -   Do not include any markdown, explanation or extra text.

    `.trim()
    
    const userMessage = `
    Destination : ${destination},
    Start Date : ${startDate},
    End Date : ${endDate},
    Duration : ${duration} days,
    Preference : ${preferences},
    Budget : ${budget},
    Additional Requests (Optional): ${additionalRequest}
    `
    try {
        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: systemMessage },
                { role: "user", content: userMessage }
            ],
            temperature: 1.0,
            top_p: 1.0,
            model: process.env.OPENAI_MODEL
        })
        if (response?.choices[0]?.message?.content) {
            const itinerary = JSON.parse(response.choices.message.content);
            itinerary.user = req.user;
            return res.status(200).json({ message: "Itinerary generated successfully", itinerary });
        }
        return res.status(500).json({ message: "Error generating itinerary."});
    } catch (error) {
        console.error("Error generating itinerary: ", error.message );
        return res.status(500).json({ message: "Error generating itinerary.", error: error.message });
    }
}

// Save a new itinerary
export const saveItinerary = async (req, res) => {
    try {
        let data = req.body;
        data.user = req.user;
        const itinerary = new Itinerary(data);
        await itinerary.save()
            .then((savedItinerary) => {
                return res.status(200).json({ message: "Itinerary saved."});
            })
            .catch((error) => {
                console.error("Error saving Itinerary: ", error.message);
                return res.status(500).json({ message: "Error saving itinerary.", error: error.message });
            })

    } catch (error) {
        console.error("Error saving itinerary: ", error.message);
        return res.status(500).json({ message: "Error saving itinerary.", error: error.message });
    }
};

// Delete an itinerary
export const deleteItinerary = async (req, res) => {
    try {
        const id = req.body;
        const itinerary = await Itinerary.findByIdAndDelete(id);
        if (itinerary) {
            return res.status(200).json({ message: "Itinerary delete successful."});
        }
        return res.status(404).json({ message: "Itinerary not found." });
    } catch (error) {
        console.error("Error deleting itinerary: ", error.message);
        return res.status(500).json({ message: "Error deleting itinerary.", error: error.message});
    }
};


export default { getItineraries, getItineraryById, generateTest, generateItinerary, saveItinerary, deleteItinerary}
