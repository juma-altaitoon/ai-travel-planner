import { Typography, Container, Grid, Button, CircularProgress, Box, Fab } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ItineraryCard from '../components/itineraries/ItineraryCard';
import AddIcon from '@mui/icons-material/Add';
import Axios from 'axios';
import { Link } from 'react-router';

const BACKEND_URL = import.meta.env.VITE_API_URL;

const getItineraries = async () => {
    try {
        const response = await Axios.get(BACKEND_URL+"/itinerary", { withCredentials: true } );
        return response.data;
    
    } catch (error) {
      console.error("Error Fetching Itineraries: ", error);
      throw new Error("Error Fetching Itineraries.", error);
      
    }
}

export default function Itineraries() {
    
    const [ itineraryList, setItineraryList ] = useState(null);
    const [ loading, setLoading ] = useState(true);


    useEffect(() => {
        getItineraries()
          .then((data) => {
            console.log(data.itineraries[0])
            setItineraryList(data.itineraries)
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => setLoading(false))
    }, [])

    function formatDate(date){
      return new Date(date).toLocaleDateString(
        'en-US', 
        { month: "short", day:"2-digit", year: "numeric" }
      );
    }

    return ( 
      <>
      {loading 
        ?
          <CircularProgress/>
        :
        <Container maxWidth="md" sx={{ position: "relative", my: 4, pb: 4, bgcolor: "background.paper", borderRadius: 16, display: "flex", flexDirection: "column", justifyContent: 'space-evenly', alignItems: "center", minHeight: "60vh"  }}>
            <Typography variant='h5' fontWeight={"bold"} textAlign="center" color='primary.main' sx={{ my: 4 }}>
                Your Saved Itineraries
            </Typography>
            {itineraryList && itineraryList.length > 0 
            ? 
                <Grid container spacing={4} >
                    {itineraryList.map((trip, index) =>(
                        console.log(),
                        <Grid size={{ xs: 6, sm: 4, md: 3}} key={index}>
                            <ItineraryCard
                                tripId={trip._id}
                                title={`${trip.city}, ${trip.country} : ${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}`}
                                subtitle={trip.friendlyOneLiner || trip.summary}
                                imageUrl={trip.imageUrl}
                                onView={() => console.log("Viewing, ", `${trip.city}, ${trip.country}` )}
                            />
                        </Grid>
                    ))}
                </Grid>
            :
            <>
                <Typography variant='h6' color='secondary.dark' textAlign="center"> You Don't have any Itineraries! </Typography>
                <Button variant='contained' color='primary' size='medium' sx={{ maxWidth: "200px", borderRadius: 5}} >Let's generate one</Button>
            </>
            }
            <Link to="/itinerary/form">
              <Fab size="large" color="warning" aria-label='add itinerary' sx={{ position: "absolute", right: 15, bottom: 15}} >
                <AddIcon/>
              </Fab>
            </Link>
        </Container>
      }
      </>
    )
}
