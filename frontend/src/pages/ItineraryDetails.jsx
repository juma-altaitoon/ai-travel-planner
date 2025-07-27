import { Box, Button, CircularProgress, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import ItineraryDetailsView from '../components/ItineraryDetailsView';
import Chat from '../pages/Chat'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL;

const getItineraryChat = async (itineraryId) =>{
    try{    
        console.log(itineraryId)
        const { data } = await Axios.post(BACKEND_URL+"/chat/itineraryId", {itineraryId}, { withCredentials: true });
        console.log(data.chatId)
        
        return data.chatId
    } catch (error) {
        console.error("Error fetching chat session", error.message);
        return null
    }
}

export default function ItineraryDetails () {

    // Gets itinerary ID from URL
    const { id } = useParams();

    // Get chatId from itinerary ID
    const [ chatId, setChatId ] = useState(null);

    useEffect(() => {
        const getChatId = async (id) => {
            const chatId = await getItineraryChat(id);
            // if (!res) return;
            console.log(chatId)
            setChatId(chatId);
        }
        if (id){
            getChatId(id);
        }        
    },[id])
    
    return (
        <Box sx={{ height: "100vh", display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2 }}>
                <Link to="/itinerary">
                    <Button variant="contained" sx={{ m:2 }} > 
                        <ArrowBackIosNewIcon/> 
                        Back To Itinerary List
                    </Button>
                </Link>
            </Box>
            <Container sx={{ flex: 1, overflow: "hidden" }}>
                <Grid container sx={{ height: "100%" }} >
                    <Grid size={{xs: 12, md: 6}} sx={{ border: "1px solid", overflowY: "auto", height:"100%", boxSizing: "border-box", pr: 1 }}> 
                        { id && <ItineraryDetailsView tripId={id}/>}
                    </Grid>
                    <Grid size={{xs: 12, md: 6}} my={2} sx={{ height: "100%", overflow: 'hidden', pl: 2, boxSizing: "border-box", display: 'flex', justifyContent: "center", alignItems: "center"}}>
                        {chatId && (
                            <Box sx={{ height: "100%", display: 'flex', justifyContent: "center", alignItems: "center"} }>
                                <Chat chatId={chatId} />
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

