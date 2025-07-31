import React, { useEffect, useState } from "react";
import { Box, Container } from '@mui/material';
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import Axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL;

const getChat = async (chatId) => {
    try {
        if (chatId) {
            console.log(chatId)
            const response = await Axios.post(BACKEND_URL+"/chat/id", {chatId} ,{ withCredentials: true });
            console.log("chat messages: ", response.data.history)
            return response.data.history;
        }
    } catch (error) {
        console.error("Error fetching chat session: ", error);  
        return null  
    }
} 

const send = async(chatId, content) => {
    try {
        console.log(chatId, content);
        const response = await Axios.post(BACKEND_URL+"/chat/send", {  chatId, prompt: content }, { withCredentials: true });
        console.log(response.data);
        return response.data.reply;    
    } catch (error) {
        console.error("Error fetching response: ", error);
    }
};



export default function Chat ({ chatId }) {
    const [ messages, setMessages ] = useState([]);
    const [ isTyping, setIsTyping ] = useState(false);

    useEffect( () => {
        const loadChat = async () => {
            try {
                if (chatId) {
                    console.log(chatId)
                    const conv = await getChat(chatId) || [];
                    setMessages(conv);
                }
            } catch (error) {
                console.error("Chat initiation error", error);
                setMessages([]);
            }
        };
        loadChat();
    }, [chatId])

    const sendMessage = async (content) => {
        if (!content.trim() || !chatId){
            return;
        }
        console.log(messages)
        setMessages(prev => [...prev, { role: "user", content }] );
        setIsTyping(true);
        console.log(chatId)
        try {
            const response = await send(chatId, content)
            setMessages( prev => [...prev, { role: "assistant", content: response }])
        } catch (error) {
            console.error("Chat error: ", error)
            setMessages( prev => [...prev, { role: "assistant", content: "Sorry, something went wrong." }]);
        } finally{
            setIsTyping(false);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection:"column", justifyContent: "center", bgcolor: "background.paper", borderRadius: 5, height: "80%" }}>
            <Box sx={{ flex:0.7, p: 1, m: 1, border: "2px solid", borderRadius: 5, borderColor: "secondary.light", boxShadow:"0 0px 10px 10px green", maxHeight: "80%" }}  >
                <ChatWindow messages={messages} isTyping={isTyping}/>

            </Box>
            <Box>
                <ChatInput sendMessage={sendMessage}/>
            </Box>
        </Box>
    )
}