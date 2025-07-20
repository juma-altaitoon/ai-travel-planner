import { Box, Button, CircularProgress } from '@mui/material';
import React from 'react';
import { useParams, Link } from 'react-router';
import ItineraryDetailsView from '../components/ItineraryDetailsView';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


export default function ItineraryDetails () {
    // Gets itinerary ID from URL
    const { id } = useParams();
    // const { state } = useLocation();
    // const [ id, setId ] = useState("")
    // setId(state?.id)
    
    return (
        <Box>
            <Link to="/itinerary">
                <Button variant="contained" sx={{ m:2 }} > 
                    <ArrowBackIosNewIcon/> 
                    Back To Itinerary List
                </Button>
            </Link>
            { id && <ItineraryDetailsView tripId={id}/>}
        </Box>
    )
}

