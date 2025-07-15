import { Box, CircularProgress } from '@mui/material';
import { Axios } from 'axios';
import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router';
import ItineraryDetailsView from '../components/ItineraryDetailsView';


export default function ItineraryDetails () {
    // Gets itinerary ID from URL
    const { id } = useParams();
    // const { state } = useLocation();
    // const [ id, setId ] = useState("")
    // setId(state?.id)
    
    return (
        <Box>
            { id && <ItineraryDetailsView id={id}/>}
        </Box>
    )
}

