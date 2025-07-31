import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, CardMedia, Divider, Chip, Alert } from '@mui/material';
import { Container, Typography, Button, IconButton, Collapse, AppBar, Tabs, Tab, Box, Grid } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { TabPanel, a11yProps } from './TabPanel';
import DailyActivities from './DailyActivities';
import Axios from 'axios';
import { useNavigate } from 'react-router';

const BACKEND_URL = import.meta.env.VITE_API_URL;

const saveItinerary = async (itinerary) => {
    try {
        const response = await Axios.post(BACKEND_URL+"/itinerary/save", itinerary, { withCredentials: true } );
        console.log(response.data)
        return response.data;
    
    } catch (error) {
      console.error("Error Saving Itinerary: ", error);
      throw new Error("Error Saving Itinerary.", error);
    }
}

const deleteChat = async (chatId) => {
    try {
        const delChat =  await Axios.post(BACKEND_URL+"/chat/delete", {chatId}, { withCredentials: true });
        console.log(delChat.data)
        return "Chat Successfully Deleted";
    } catch (error) {
        console.error("Error Deleting Chat: ", error);
        return;
    }
}

export default function GeneratedItinerary({ itinerary }) {
    // const { state } = useLocation();
    const navigate = useNavigate();
    const [ expand, setExpand ] = useState(false);
    const [ tabIndex, setTabIndex ] = useState(0);
    // const [ itinerary, setItinerary ] = useState(state?.itinerary || null);

    
    const handleExpand = () => {
        setExpand(!expand);
    };

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        await deleteChat(itinerary.chat);
        navigate("/itinerary");
    }

    const handleSave = async () => {
        try {
            await saveItinerary(itinerary);
            console.log("Successful Save.")
            navigate("/itinerary")
        } catch (error) {
            throw new Error("Error Saving Itinerary: ", error.message);
        }
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

    return(
        <>
            <Container maxWidth="md" sx={{ my: 5 }}>
            {itinerary ?
                <>
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
                                    loading="lazy"
                                    src={itinerary.image.url || "image_placeholder.png"}
                                    sx={{ 
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 5,
                                        boxShadow: 1,
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
                                        <Chip key={preference} label={preference} size="small" color='primary' sx={{ m:1 }} />
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
                        <CardActions sx={{ m:1, justifyContent: "space-between"}} >
                            <Button variant='contained' onClick={handleSave} aria-label='save'>
                                <SaveIcon/>
                                {/* Save */}
                            </Button>
                            <Button variant={expand ? "contained" : "outlined"} aria-label='expand itinerary' onClick={handleExpand} aria-expanded={expand} color='info'>
                                Daily Schedule 
                                { expand 
                                    ? <ExpandLessIcon />
                                    :<ExpandMoreIcon/> 
                                }
                            </Button>
                            <Button variant='contained' color='error' onClick={handleDelete}>
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
                </>    
                    :
                    <Typography variant='h3' color='warning'>
                            Oh no! We something went wrong.
                    </Typography>
                }    
            </Container>
        </>
    )
}
