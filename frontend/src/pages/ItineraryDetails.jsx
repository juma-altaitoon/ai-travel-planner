import { Box, Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import ItineraryDetailsView from '../components/ItineraryDetailsView';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL;

const getItineraryChat = async (itineraryId) =>{
    try {
        const response = await Axios.post(BACKEND_URL+"/chat/itinerary-chat", itineraryId, { withCredentials: true });
        return response.data.sessionId
    } catch (error) {
        console.error("Error fetching chat session", error.message);
    }
}

export default function ItineraryDetails () {

    // Gets itinerary ID from URL
    const { id } = useParams();

    // Get chat session ID from itinerary ID
    const [ sessionId, setSessionId ] = useState(null);

    useEffect(() => {
        try {
            const res = getItineraryChat(id);
            setSessionId(res);
        } catch (error) {
            console.error("Error fetching chat session: ", error.message);
        }
    },[id])
    
    return (
        <Box>
            <Link to="/itinerary">
                <Button variant="contained" sx={{ m:2 }} > 
                    <ArrowBackIosNewIcon/> 
                    Back To Itinerary List
                </Button>
            </Link>
            {/* { id && <ItineraryDetailsView tripId={id}/>} */}
            <Container>
                <Grid container sx={{ m:1 }} >
                    <Grid size={{xs: 12, md: 6}}> 
                        { id && <ItineraryDetailsView tripId={id}/>}
                    </Grid>
                    <Grid size={{xs: 12, md: 6}} my={2}>
                        {sessionId && <Chat sessionId={sessionId} />}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

