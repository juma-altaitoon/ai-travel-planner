import React, { useEffect, useRef, useState } from "react";
import { Box, Container } from '@mui/material';
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import Axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL;

const create = async() => {
    try {
        const response = await Axios.get(BACKEND_URL+"/chat/create", { withCredentials: true })
        return response.data.sessionId;    
    } catch (error) {
        console.error("Error creating chat session: ", error)    
    }  
}

const getChat = async (sessionId) => {
    try {
        console.log({sessionId})
        const response = await Axios.post(BACKEND_URL+"/chat/id", { sessionId } ,{ withCredentials: true });
        return response.data.session.messages;  
    } catch (error) {
        console.error("Error fetching chat session: ", error);    
    }
} 

const send = async(sessionId, content) => {
    try {
        const response = await Axios.post(BACKEND_URL+"/chat/send", {  sessionId: sessionId, prompt: content }, { withCredentials: true });
        console.log(response.data);
        return response.data.reply;    
    } catch (error) {
        console.error("Error fetching response: ", error);
    }
};



export default function Chat ({sessionId : propSessionId }) {
    const [ messages, setMessages ] = useState([]);
    const [ isTyping, setIsTyping ] = useState(false);
    const [ sessionId, setSessionId ] = useState( propSessionId || null);
    // const [ localSessionId, setLocalSessionId ] = useState(null);
    const bottomRef = useRef(null);

    const scrollBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}

    useEffect( () => {
        const initiateChat = async () => {
            try {
                let id = propSessionId
                if (!id) {
                    id = await create(); 
                }
                setSessionId(id);

                const conv = await getChat(id);
                setMessages(conv);
            } catch (error) {
                console.error("Chat initiation error", error);
            }
        };
        initiateChat();
    }, [propSessionId])

    useEffect(() => {
        scrollBottom();
    }, [messages])


    const sendMessage = async (content) => {
        if (!content.trim() || !sessionId){
            return;
        }

        setMessages(prev => [...prev, { role: "user", content: content }] );
        setIsTyping(true);

        try {
            const response = await send(sessionId, content)
            
            setMessages( prev => [...prev, { role: "assistant", content: response }])
        } catch (error) {
            console.error("Chat error: ", error)
            setMessages( prev => [...prev, { role: "assistant", content: "Sorry, something went wrong." }]);
        } finally{
            setIsTyping(false);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection:"column", bgcolor: "background.paper" }}>
            <Box sx={{ flex: 1, p: 1, m: 1, border: "3px solid", borderRadius: 5, borderColor: "secondary.light", boxShadow:"0 0px 10px 10px white", maxHeight: "60%" }}  >
                <ChatWindow messages={messages} isTyping={isTyping}/>
                <div ref={bottomRef} />
            </Box>
            <Box>
                <ChatInput sendMessage={sendMessage}/>
            </Box>
        </Box>
    )
}