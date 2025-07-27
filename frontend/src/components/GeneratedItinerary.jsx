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

    const handleDelete = () => {
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
                                    height={200}
                                    src='/vite.svg' 
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
                            <Button variant="outlined" aria-label='expand itinerary' onClick={handleExpand} aria-expanded={expand} color='info'>
                                Daily Schedule 
                                { expand 
                                    ? <ExpandLessIcon/>
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

// const itinerarySample = {
//     "friendlyOneLiner": "Experience Kyoto's enchanting temples, scenic beauty, and flavorful vegetarian cuisine in 5 immersive days.",
//     "country": "Japan",
//     "city": "Kyoto",
//     "startDate": "2025-08-01",
//     "endDate": "2025-08-05",
//     "duration": 5,
//     "preferences": [
//         "Cultural",
//         "Foodie",
//         "Nature"
//     ],
//     "budget": "mid",
//     "additionalRequest": "Include hidden temples, scenic routes, and vegetarian food spots.",
//     "itineraryDays": [
//         {
//             "day": 1,
//             "date": "2025-08-01",
//             "morning": {
//                 "activity": "Explore the Philosopher's Path",
//                 "location": "Philosopher's Path",
//                 "description": "Stroll along the charming canal-line path surrounded by nature, connecting hidden temples in Northern Higashiyama.",
//                 "link": "https://www.japan-guide.com/e/e3906.html",
//                 "youtubeLink": "https://www.youtube.com/watch?v=VsuSNTIpyyY",
//                 "cost": 0
//             },
//             "afternoon": {
//                 "activity": "Vegetarian Lunch and Visit Honen-in Temple",
//                 "location": "Honen-in Temple and Veggie Cafe",
//                 "description": "Dine at Choice Cafe (vegan/vegetarian) near Ginkaku-ji, then walk to the secluded Honen-in Temple nearby.",
//                 "link": "https://www.kyotostation.com/choice-vegan-cafe-restaurant/",
//                 "youtubeLink": "https://www.youtube.com/watch?v=-8Rcmdhq7wc",
//                 "cost": 25
//             },
//             "evening": {
//                 "activity": "Twilight Visit to Nanzen-ji Temple",
//                 "location": "Nanzen-ji Temple",
//                 "description": "Wander Nanzen-ji’s serene grounds, less crowded at dusk—enjoy forested paths and iconic aqueduct.",
//                 "link": "https://www.japan-guide.com/e/e3908.html",
//                 "youtubeLink": "https://www.youtube.com/watch?v=MNvDKfJbjmo",
//                 "cost": 5
//             },
//             "transport": [
//                 "Walk",
//                 "Bus"
//             ],
//             "notes": "Wear comfortable walking shoes; both Philosopher's Path and Nanzen-ji are scenic and shaded."
//         },
//         {
//             "day": 2,
//             "date": "2025-08-02",
//             "morning": {
//                 "activity": "Early Morning at Fushimi Inari Taisha",
//                 "location": "Fushimi Inari Taisha",
//                 "description": "Beat the crowds at the iconic thousand torii gates and continue up the scenic mountain trails.",
//                 "link": "https://www.japan-guide.com/e/e3915.html",
//                 "youtubeLink": "https://www.youtube.com/watch?v=Hzc4rDAn4aY",
//                 "cost": 0
//             },
//             "afternoon": {
//                 "activity": "Vegetarian Udon Lunch & Tofuku-ji Temple",
//                 "location": "Tofuku-ji Temple and Ganko Nijoen (Veg options)",
//                 "description": "Savor handmade udon at a local spot before heading to Tofuku-ji, a hidden zen gem with lush gardens.",
//                 "link": "https://tofukuji.jp/en/",
//                 "youtubeLink": "https://www.youtube.com/watch?v=UnR5V3-XOI4",
//                 "cost": 18
//             },
//             "evening": {
//                 "activity": "Stroll through Gion’s Old Streets",
//                 "location": "Gion District",
//                 "description": "Evening wander in historic Gion, with traditional wooden machiya and possible brief geisha sightings.",
//                 "link": "https://www.japan-guide.com/e/e3902.html",
//                 "youtubeLink": "https://www.youtube.com/watch?v=G7zW4kQN_8c",
//                 "cost": 0
//             },
//             "transport": [
//                 "Train",
//                 "Walk"
//             ],
//             "notes": "Start early at Fushimi Inari; many steps involved. Evening in Gion—dress light for summer."
//         },
//         {
//             "day": 3,
//             "date": "2025-08-03",
//             "morning": {
//                 "activity": "Arashiyama Bamboo Grove & Okochi Sanso Villa",
//                 "location": "Arashiyama",
//                 "description": "Walk the magical bamboo groves and tour Okochi Sanso Villa for breathtaking mountain views.",
//                 "link": "https://www.japan-guide.com/e/e3912.html",
//                 "youtubeLink": "https://www.youtube.com/watch?v=rQ0zhs1v8g0",
//                 "cost": 10
//             },
//             "afternoon": {
//                 "activity": "Shigetsu Zen Vegetarian Lunch & Tenryu-ji Temple",
//                 "location": "Shigetsu Restaurant (Tenryu-ji Temple Grounds)",
//                 "description": "Try shojin ryori (Buddhist vegetarian cuisine) inside the exquisite garden setting of Tenryu-ji.",
//                 "link": "https://www.tenryuji.com/en/shigetsu/",
//                 "youtubeLink": "https://www.youtube.com/watch?v=pIG5WxR5tTw",
//                 "cost": 35
//             },
//             "evening": {
//                 "activity": "Boat Ride on Hozugawa River",
//                 "location": "Hozugawa River, Arashiyama",
//                 "description": "Relax with an evening boat ride on the river, surrounded by forested hills and cooling breezes.",
//                 "link": "https://www.hozugawakudari.jp/en/",
//                 "youtubeLink": "https://www.youtube.com/watch?v=qv23Dv_rhZQ",
//                 "cost": 45
//             },
//             "transport": [
//                 "Train",
//                 "Walk",
//                 "Boat"
//             ],
//             "notes": "Cooler in Arashiyama due to shade; bring hat and water. Reserve riverside boat in advance."
//         },
//         {
//             "day": 4,
//             "date": "2025-08-04",
//             "morning": {
//                 "activity": "Kurama Temple and Mountain Hike",
//                 "location": "Kurama-dera",
//                 "description": "Escape the city on a wooded hike, discovering the hidden mountain temple of Kurama-dera.",
//                 "link": "https://www.insidekyoto.com/kurama-and-kibune",
//                 "youtubeLink": "https://www.youtube.com/watch?v=3iofa5IygK4",
//                 "cost": 3
//             },
//             "afternoon": {
//                 "activity": "Lunch by the River in Kibune (Vegetarian Kaiseki)",
//                 "location": "Kibune Kawadoko Restaurants",
//                 "description": "Enjoy a cool, multi-course vegetarian meal at a riverside platform restaurant in Kibune.",
//                 "link": "https://www.japan-guide.com/e/e3966.html",
//                 "youtubeLink": "https://www.youtube.com/watch?v=CD44s_S4TJ0",
//                 "cost": 40
//             },
//             "evening": {
//                 "activity": "Soak in Kurama Onsen",
//                 "location": "Kurama Onsen",
//                 "description": "Unwind in a rural hot spring bath overlooking forested mountains (private/family baths available).",
//                 "link": "https://www.kurama-onsen.co.jp/english.html",
//                 "youtubeLink": "https://www.youtube.com/watch?v=OHOku11I8Bw",
//                 "cost": 18
//             },
//             "transport": [
//                 "Eizan Railway",
//                 "Walk"
//             ],
//             "notes": "Bring hiking gear and a towel for onsen. Reserve kawadoko lunch if possible (limited summer seating)."
//         },
//         {
//             "day": 5,
//             "date": "2025-08-05",
//             "morning": {
//                 "activity": "Explore Daigo-ji Temple Complex",
//                 "location": "Daigo-ji Temple",
//                 "description": "Discover the vast UNESCO temple grounds, hidden pagodas, and serene pond gardens far from city crowds.",
//                 "link": "https://www.daigoji.or.jp/english/",
//                 "youtubeLink": "https://www.youtube.com/watch?v=nq18ju6NAH4",
//                 "cost": 8
//             },
//             "afternoon": {
//                 "activity": "Vegetarian Bento Lunch & Uji Byodo-in Visit",
//                 "location": "Uji (Byodo-in Temple and veggie café)",
//                 "description": "Catch a train to Uji, taste matcha treats and vegetarian bento, then see the Phoenix Hall temple.",
//                 "link": "https://www.japan-guide.com/e/e3975.html",
//                 "youtubeLink": "https://www.youtube.com/watch?v=6-ju2ktbFsM",
//                 "cost": 20
//             },
//             "evening": {
//                 "activity": "Return to Kyoto and Farewell Dinner",
//                 "location": "Vegans Cafe & Restaurant, Kyoto",
//                 "description": "Wrap up with a delicious plant-based dinner at a local-favorite spot with creative Japanese cuisine.",
//                 "link": "https://veganscafe.com/",
//                 "youtubeLink": "https://www.youtube.com/watch?v=kT0T9ssPDRc",
//                 "cost": 25
//             },
//             "transport": [
//                 "Train",
//                 "Walk"
//             ],
//             "notes": "Uji can be very hot in August—bring sunblock. Savour final Kyoto moments with matcha and food."
//         }
//     ],
//     "summary": "This mid-budget itinerary blends Kyoto’s cultural gems and tranquil nature escapes with unique hidden temples, scenic walks, and standout vegetarian meals every day, ensuring a balanced local experience from city pathways to rural mountain retreats.",
//     "user": "68617be21337057828169caa"
// }
