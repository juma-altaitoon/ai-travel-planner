import { Box, Button, CircularProgress, Container, DialogActions, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import ItineraryDetailsView from '../components/ItineraryDetailsView';
import Chat from '../pages/Chat'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Axios from 'axios';
import DeleteDialog from '../components/DeleteDialog';

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

const deleteItinerary = async (itineraryId, chatId) => {
    try {
        const delItinerary = await Axios.post(BACKEND_URL+"/itinerary/delete", {id: itineraryId}, { withCredentials: true });
        console.log(delItinerary.data);
        const delChat =  await Axios.post(BACKEND_URL+"/chat/delete", {chatId}, { withCredentials: true });
        console.log(delChat.data)
        return "Itinerary Successfully Deleted";
    } catch (error) {
        console.error("Error Deleting Itinerary: ", error);
        return;
    } 
}

export default function ItineraryDetails () {

    // Gets itinerary ID from URL
    const { id } = useParams();
    const navigate = useNavigate();
    // Get chatId from itinerary ID
    const [ chatId, setChatId ] = useState(null);
    // Condition to open DeleteDialog
    const [ open, setOpen ] = useState(false);


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

    const openDialog = (e) => {
        e.preventDefault();
        setOpen(true);
    }
    const onCancel = (e) => {
        e.preventDefault();
        setOpen(false)
    } 

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            await deleteItinerary(id, chatId);
            setOpen(false);
            navigate("/itinerary");
        } catch (error) {
            console.error("Error Deleting Itinerary: ", error);
        }
    }
    
    return (
        <Box sx={{ height: "100%", width: "100%", display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 1 }}>
                <Link to="/itinerary">
                    <Button variant="contained" sx={{ mx: 2, my: 1 }} > 
                        <ArrowBackIosNewIcon/> 
                        Back To Itinerary List
                    </Button>
                </Link>
            </Box>
            <Container sx={{ overflow: { sm: "auto", md: "hidden" } }}>
                <Grid container sx={{ height: "100vh", width: "100%" }} >
                    <Grid size={{xs: 12, md: 6}} sx={{ border: "1px solid", overflowY: "auto", height:"100%", boxSizing: "border-box", pr: 1 }}> 
                        { id && <ItineraryDetailsView tripId={id} openDialog={openDialog}/>}
                    </Grid>
                    <Grid size={{xs: 12, md: 6}} sx={{ height: "100vh", overflow: 'hidden', pl: 2, boxSizing: "border-box", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                        {chatId && (
                            <Box my={1} sx={{ height: "90%" }}>
                                <Chat chatId={chatId} />
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Container>
            <DeleteDialog open={open} onCancel={onCancel} handleDelete ={handleDelete} />
        </Box>
    )
}

