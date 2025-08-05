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
            // console.log(data.itineraries[0])
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
        <Container maxWidth="lg" sx={{ position: "relative", py: 2, bgcolor: "background.paper", borderRadius: 5 }}>
            <Typography variant='h5' fontWeight={"bold"} textAlign="center" color='primary.main' gutterBottom>
                Your Saved Itineraries
            </Typography>
            {itineraryList && itineraryList.length > 0 
            ? 
                <Grid container spacing={3}  sx={{ justifyContent: 'center'}}>
                    {itineraryList.map((trip, index) =>(
                        <Grid size={{ xs: 12, sm: 8, md: 4 }} key={index}>
                            <ItineraryCard
                                tripId={trip._id}
                                title={`${trip.city}, ${trip.country} : ${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}`}
                                subtitle={trip.friendlyOneLiner || trip.summary}
                                imageUrl={trip.image.url}
                                onView={() => console.log("Viewing, ", `${trip.city}, ${trip.country}` )}
                            />
                        </Grid>
                    ))}
                </Grid>
            :
            <Box textAlign={"center"} mt={4}>
                <Typography variant='h6' color='text.secondary' gutterBottom> You Don't have any Itineraries! </Typography>
                <Link to={"/itinerary/form"}>
                  <Button variant='contained' color='primary' sx={{ borderRadius: 5 }} >Let's generate one</Button>
                </Link>
            </Box>
            }
            <Link to="/itinerary/form">
              <Fab size="large" color="warning" aria-label='add itinerary' sx={{ position: "fixed", right: 24, bottom: 24, zIndex: 1000}} >
                <AddIcon/>
              </Fab>
            </Link>
        </Container>
      }
      </>
    )
}
