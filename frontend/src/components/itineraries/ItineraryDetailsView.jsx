import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardActions, CardMedia, Divider, Chip, CircularProgress } from '@mui/material';
import { Container, Typography, Button, IconButton, Collapse, AppBar, Tabs, Tab, Box, Grid } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TabPanel, a11yProps } from './TabPanel';
import DailyActivities from './DailyActivities';
import Axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const BACKEND_URL = import.meta.env.VITE_API_URL;

const getItineraryById = async (id) => {
    try {
        const response = await Axios.post(BACKEND_URL+"/itinerary/id", { id }, { withCredentials: true });
        console.log(response.data)
        return response.data.itinerary;
    } catch (error) {
        console.error("Error fetching itinerary: ", error);
        
    }
}

export default function ItineraryDetailsView({ tripId, openDialog }) {
    const [ expand, setExpand ] = useState(false);
    const [ tabIndex, setTabIndex ] = useState(0);
    const [ itinerary, setItinerary ] = useState( null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if (!tripId) return;
        let cancelled = false;

        console.log(tripId)
        getItineraryById(tripId)
            .then((data) => {
                if(!cancelled) {
                    setItinerary(data); 
                }
            })
            .catch((error) => console.error(error))
            .finally(() => !cancelled && setLoading(false))
        
        return () => {
            cancelled = true;
        }
    }, [tripId])
    
    const handleExpand = () => {
        setExpand(!expand);
    };

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    }

    function formatHeaderDate(date){
      return new Date(date).toLocaleDateString(
        'en-US', 
        { month: "short", day:"2-digit", year: "numeric" }
      );
    }
    
    function formatTabDateLabel(day, date) {
        const dateObject = new Date(date);
        const weekday = dateObject.toLocaleDateString('en-US', {weekday: "short"}).toUpperCase();
        const dayAndMonth = `${dateObject.getDate()}/${dateObject.getMonth() + 1}`;
        return `Day ${day} - ${weekday} ${dayAndMonth}`;
    }


    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: "center", mt:8 }}>
                <CircularProgress/>
            </Box>
        )
    }

    if (!itinerary) {
        return (
            <Typography variant='h6' align="center" sx={{ mt: 8 }} >
                No Itinerary Found
            </Typography>
        )
    }

    return(
        <>
            <Container maxWidth="md"  justifyContent={"center"} sx={{ my: 2 }}>
                <Card 
                    sx={{ 
                        borderRadius: 5,
                        transition: "box-shadow 0.3s, transform 0.3s",
                        boxShadow: 1,
                        "&:hover": {
                            border: "3px solid",
                            borderColor: "primary.main",
                            transform: "scale(1.01)",
                            cursor: "pointer"
                        }
                    }}
                >
                    <CardHeader 
                        title={itinerary.city + ", " + itinerary.country + " - Itinerary"}
                        subheader={formatHeaderDate(itinerary.startDate) + " - " + formatHeaderDate(itinerary.endDate) }    
                    />
                    <Divider/>
                    <Grid container spacing={1} alignItems="center" justifyContent="center" >
                        <Grid size={{ xs:12, md: 12 }}>
                            <CardContent >
                                <Typography variant='body1' color="info" fontWeight={'bold'} m={1}>
                                    {itinerary.friendlyOneLiner}
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid size={{ xs:12, md: 5 }}>
                            <CardMedia 
                                component="img"
                                height={200}
                                src={itinerary.image.url || "image_placeholder.png"} 
                                sx={{ 
                                    width: "100%",
                                    borderRadius: 5,
                                    boxShadow: 2,
                                    objectFit: "contain"
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs:12, md: 7 }}>
                            <CardContent sx={{ px: 1 }} >
                                <Typography variant='subtitle1'm={1}>
                                    {itinerary.summary}
                                </Typography> 
                            </CardContent>
                        </Grid>
                        <Grid size={{ xs:12, md: 5 }}>    
                            <CardContent>
                                <Typography fontWeight="bold" mb={1}>
                                    Preferences: 
                                </Typography>
                                {itinerary.preferences.map((preference) => (
                                    <Chip key={preference} label={preference} size="small" color='primary'sx={{ m:0.5 }}/>
                                ))}
                                <Chip label={`Budget: ${itinerary.budget}`} size="small" color='secondary' />
                            </CardContent>
                        </Grid>
                        <Grid size={{ xs:12, md: 7 }}>    
                            <CardContent>
                                <Typography fontWeight="bold" mb={1} >
                                    Additional Request
                                </Typography>
                                <Typography variant="subtitle2" color='secondary'>
                                    {itinerary.additionalRequest}
                                </Typography>   
                            </CardContent> 
                        </Grid>                     
                    </Grid>
                    <CardActions sx={{ justifyContent: "space-between"}}>
                        <Button variant={expand ? "contained" : "outlined"} aria-label='expand itinerary' color='info' onClick={handleExpand} aria-expanded={expand}>
                            Daily Schedule 
                            { expand 
                                ? <ExpandLessIcon/>
                                :<ExpandMoreIcon/> 
                            }
                        </Button>
                        <Button variant='contained' color='error' onClick={openDialog}>
                            <DeleteIcon />
                            {/* Delete */}
                        </Button>
                    </CardActions>
                </Card>
                    
                <Collapse in={expand} unmountOnExit>
                    <Card>
                        <AppBar position='static'>
                            <Tabs
                                value={tabIndex}
                                onChange={handleTabChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                variant="scrollable"
                                allowScrollButtonsMobile
                                scrollButtons
                            >   
                                {itinerary.itineraryDays.map((data, idx) => (
                                    <Tab label={formatTabDateLabel(data.day, data.date)} {...a11yProps(idx)} key={data.day} />
                                ))} 
                            </Tabs>
                        </AppBar>
                    </Card>
                    {itinerary.itineraryDays.map((data, idx) => (
                        <TabPanel value={tabIndex} index={idx} key={data.day}>
                            <DailyActivities dayActivities={data}/>
                        </TabPanel>
                    ))}     
                </Collapse> 
            </Container>
        </>
    )
}
