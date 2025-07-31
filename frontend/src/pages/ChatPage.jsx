import { Container, Typography, Box, IconButton, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import { useState } from "react";
import Axios from 'axios';
import Chat from "./Chat";


const BACKEND_URL = import.meta.env.VITE_API_URL;

const getChatId = async () => {
    try {
        const response = await Axios.get(BACKEND_URL+"/chat/chatId" ,{ withCredentials: true });
        // console.log("chatId: ", response.data.chatId)
        return response.data.chatId;
    } catch (error) {
        console.error("Error fetching chat session: ", error);  
        return null  
    }
} 

const createChat = async() => {
    try {
        const response = await Axios.get(BACKEND_URL+"/chat/create", { withCredentials: true })
        return response.data.chatId;    
    } catch (error) {
        console.error("Error creating chat session: ", error)    
    }  
}

export default function ChatPage () {
    const [ chatOpen, setChatOpen ] = useState(false);
    const [ chatId, setChatId ] = useState(null);


    const handleOpenChat = async() => {
        try {
            const id = await getChatId() || await createChat();
            console.log(id);
            setChatId(id);
            setChatOpen(true);
        } catch (error) {
            console.error("Chat loading error: ", error);
        }
    }
    if (!chatOpen) { 
        return (
                <Container sx={{height: "80vh", justifyItems:"center", bgcolor: "background.paper"}}>
                    <Box m={10}>
                        <Typography variant="h4" color="secondary" >Chat Page</Typography>
                    </Box>
                    <Box >
                        <Fab variant="extended"  size="large" color="primary" aria-label='create chat' onClick={handleOpenChat} >
                            <AddIcon/>
                            Open Chat
                        </Fab>
                    </Box>        
                </Container> 
        )
    } else {
        return (
            <Container maxWidth="md" sx={{ height: "100%", my: 2, }}>
                <Chat chatId={chatId} />
            </Container>
        )
    }
}