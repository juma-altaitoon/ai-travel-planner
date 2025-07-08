
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
        <Box sx={{ p: 10, bgcolor: "background.paper", minHeight: "100vh" }}>
            <Grid container spacing={4} sx={{ p: 1, justifyContent:"center", alignItems: "center"}}>
                <Grid  size={{ xs: 12 }} sx={{display: "flex", justifyContent: "space-evenly", alignItems: "center", color: "secondary.light", bgcolor: "primary.dark", py: 4}}>
                    <PanoramaIcon fontSize='large' bgcolor="primary.light"/>
                    <LuggageIcon fontSize='large'/>
                    <MuseumIcon fontSize='large'/>
                    <DownhillSkiingIcon fontSize='large'/>
                    <SurfingIcon fontSize='large'/>
                    <HikingIcon fontSize='large'/>
                </Grid>
                { featuresList.map((feature, i) => (
                    <Grid size={{xs: 12, md: 4}} key={i}>
                        <Paper elevation={3} sx={{ p:3, height: "100%", borderRadius: "10px" }}>
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
