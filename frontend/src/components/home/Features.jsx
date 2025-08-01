
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import TimelineIcon from '@mui/icons-material/Timeline';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import SurfingIcon from '@mui/icons-material/Surfing';
import MuseumIcon from '@mui/icons-material/MuseumOutlined';
import HikingIcon from '@mui/icons-material/Hiking';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import LuggageIcon from '@mui/icons-material/LuggageOutlined';
import PanoramaIcon from '@mui/icons-material/PanoramaOutlined';

import { Box, Grid, Paper, Typography } from '@mui/material';

const featuresList = [
    { icon: <AirplanemodeActiveIcon/>, title: "Smart AI Planning" },
    { icon: <BeachAccessIcon />, title: "Relax & Enjoy." },
    { icon: <LockIcon />, title: "Highly Secure" },
    { icon: <PeopleIcon />, title: "Personalized Schedule"},
    { icon: <TimelineIcon />, title: "Intuitive & Easy as 123..." },
    { icon: <SaveAltIcon />, title: "Save & Revisit" }
];

export default function Features() {

    return (
        <Box sx={{ p: 5, bgcolor: "background", minHeight: "100vh", display: "flex", justifyContent: "space-between", flexWrap: "wrap"  }}>
            <Box 
                component={"img"} 
                src="Adventure_bot.png" 
                sx={{ 
                    border: "2px solid",
                    borderColor: "primary.dark",
                    borderRadius: 35,
                    my: 5,
                    height: "80%",
                    width: "80%",
                    maxWidth: "600px", 
                    maxHeight: "800px",
                    boxShadow: `0 0 40px 5px grey`,
                     "&:hover": { 
                        bgcolor: "primary.main", 
                        borderColor: "primary.light",
                        boxShadow: `0 0 40px 10px white` 
                    }      
                }}/>
            <Grid container maxWidth = "sm" spacing={4} sx={{ p: 1, justifyContent:"center", alignItems: "center"}}>
                <Grid  size={{ xs: 12 }} sx={{display: "flex", justifyContent: "space-evenly", alignItems: "center", color: "secondary.light", bgcolor: "primary.light", py: 4, border: "2px solid", borderRadius: 5, borderColor: "secondary.dark"}}>
                    <PanoramaIcon fontSize='large'/>
                    <LuggageIcon fontSize='large'/>
                    <MuseumIcon fontSize='large'/>
                    <DownhillSkiingIcon fontSize='large'/>
                    <SurfingIcon fontSize='large'/>
                    <HikingIcon fontSize='large'/>
                </Grid>
                { featuresList.map((feature, i) => (
                    <Grid size={{xs: 12, md: 6}} key={i}>
                        <Paper elevation={3} sx={{ p:1, height: "100%", borderRadius: 5, border: "1px solid", boxShadow: `0 0 30px 0 grey`, borderColor: "primary.main", "&:hover": { bgcolor: "GrayText", borderColor: "primary.light" }}}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", my: 2 }}>
                                {feature.icon}
                                <Typography variant="h6" color="secondary" sx={{ mt: 2 }}>
                                    {feature.title}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
