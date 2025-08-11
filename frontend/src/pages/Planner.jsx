import { Container, Grid, Box, Skeleton } from '@mui/material';
import React, { useState } from 'react';
import { useLocation} from 'react-router';
import GeneratedItinerary from '../components/itineraries/GeneratedItinerary';
import Chat from '../components/chat/Chat';
import Axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL;

// const updateItinerary = async (currentItinerary, chatId) => {
//     try {
//         const response = await Axios.post(BACKEND_URL+"/itinerary/update", { currentItinerary, chatId }, { withCredentials: true });
//         return response.data.itinerary
//     } catch (error) {
//         console.error("Error generating new itinerary: ", error.message);
//     }
// };

export default function Planner () {
    const location = useLocation();
    const { itinerary, chatId } = location.state || {};
    
    const [ plan, setPlan ] = useState(itinerary)
    // const [ updating, setUpdating ] = useState(false);

    // const update = async () => {
    //     try {
    //         const newItinerary = await updateItinerary(itinerary, chatId);
    //         console.log(newItinerary)
    //         if (newItinerary === "NO" ){
    //             return;
    //         } else{
    //             setUpdating(true)
    //             setPlan(newItinerary)             
    //         }
    //     } catch (error) {
    //         console.error("Error updating Itinerary: ", error.message);
    //     } finally {
    //         setUpdating(false);
    //     }
    // }

    return (
        <Container sx={{ height: "100%", display: "flex", flexDirection: "row", overflow: "hidden" }}>
            <Grid container sx={{ m:1, height: '100%' }} >
                <Grid size={{xs: 12, md: 6}} sx={{ border: "1px solid", overflowY: "auto", scrollbarWidth: "none", height: "100vh", boxSizing: "border-box", pr: 1 }}> 
                    <GeneratedItinerary itinerary={plan} />
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