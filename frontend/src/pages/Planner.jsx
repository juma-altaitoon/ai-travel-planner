import { Container, Grid } from '@mui/material';
import React from 'react';
import { useLocation} from 'react-router';
import GeneratedItinerary from '../components/GeneratedItinerary';
import Chat from './Chat';

export default function Planner () {
    const location = useLocation();
    const { itinerary, chatId } = location.state || {};


    return (
        <Container>
            <Grid container sx={{ m:1 }} >
                <Grid size={{xs: 12, md: 6}} sx={{ border: "1px solid", flexGrow: 1, overflowY: "auto" }}> 
                    <GeneratedItinerary itinerary={itinerary} />
                </Grid>
                <Grid size={{xs: 12, md: 6}} my={2}>
                    <Chat chatId={chatId} />
                </Grid>
            </Grid>
        </Container>
    )
}