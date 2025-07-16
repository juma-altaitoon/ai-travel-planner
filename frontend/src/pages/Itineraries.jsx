import { Typography, Container, Grid, Button, CircularProgress, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ItineraryCard from '../components/itineraries/ItineraryCard';
import Axios from 'axios';

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
        <Container maxWidth="md" sx={{ my: 4, pb: 4, bgcolor: "background.paper", borderRadius: 16, display: "flex", flexDirection: "column", justifyContent: 'center' }}>
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
                <Button variant='contained' color='primary' size='medium' >Let's generate one</Button>
            </>
            }
        </Container>
      }
      </>
    )
}

// const sampleItineraries = [  
// {
//     title: 'Kyoto, Japan · Aug 1–5',
//     subtitle: 'Find serenity in temples and taste heaven in ramen.',
//     imageUrl: ''
//   },
//   {
//     title: 'Rome, Italy · Sep 10–15',
//     subtitle: 'Gelato, gladiators, and ancient ruins—your Roman adventure awaits.',
//     imageUrl: ''
//   },
//   {
//     title: 'Marrakech, Morocco · Oct 3–6',
//     subtitle: 'Markets, mosaics, and Moroccan mint tea under desert skies.',
//     imageUrl: ''
//   },
//   {
//     title: 'Reykjavík, Iceland · Nov 1–4',
//     subtitle: 'Chase northern lights and soak in volcanic springs.',
//     imageUrl: ''
//   },
//   {
//     title: 'Barcelona, Spain · Dec 18–22',
//     subtitle: 'Tapas trails and Gaudí architecture meet beachfront bliss.',
//     imageUrl: ''
//   },
//   {
//     title: 'Bali, Indonesia · Jan 10–16',
//     subtitle: 'Rice terraces, sunset temples, and ocean retreats await.',
//     imageUrl: ''
//   },
//   {
//     title: 'Paris, France · Feb 5–9',
//     subtitle: 'Croissants and cobblestones—fall in love with every step.',
//     imageUrl: ''
//   },
//   {
//     title: 'Queenstown, New Zealand · Mar 20–25',
//     subtitle: 'Bungee jumps, glacial lakes, and adrenaline-fueled escapes.',
//     imageUrl: ''
//   },
//   {
//     title: 'Cusco, Peru · Apr 7–12',
//     subtitle: 'Explore Incan heritage en route to Machu Picchu’s magic.',
//     imageUrl: ''
//   }
// ];
