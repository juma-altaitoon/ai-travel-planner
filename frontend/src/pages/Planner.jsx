import { Container, Grid, Box } from '@mui/material';
import React from 'react';
import { useLocation} from 'react-router';
import GeneratedItinerary from '../components/itineraries/GeneratedItinerary';
import Chat from '../components/chat/Chat';

export default function Planner () {
    const location = useLocation();
    const { itinerary, chatId } = location.state || {};


    return (
        <Container sx={{ height: "100%", display: "flex", flexDirection: "row", overflow: "hidden" }}>
            <Grid container sx={{ m:1, height: '100%' }} >
                <Grid size={{xs: 12, md: 6}} sx={{ border: "1px solid", overflowY: "auto", scrollbarWidth: "none", height: "100vh", boxSizing: "border-box", pr: 1 }}> 
                    <GeneratedItinerary itinerary={itinerary} />
                </Grid>
                <Grid size={{xs: 12, md: 6}} sx={{ height: "100vh", overflow: 'hidden', boxSizing: "border-box", display: 'flex', justifyContent: "center", alignItems: "center", pl: 2 }}>
                    <Box sx={{ height: "100%", display: 'flex', justifyContent: "center", alignItems: "center" } }>
                        <Chat chatId={chatId} />
                    </Box>
                </Grid>
            </Grid>
        </Container> 
    )
}