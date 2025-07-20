import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";

export default function Hero () {
    
    return (
        <Box sx={{ 
            position: "relative", 
            overflow: "hidden", 
            height: "100vh", 
            color: 'text.primary',  
            p: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        }}>
            {/* Hero Image / Video */}
            <video 
                autoPlay
                muted
                playsInline
                loop
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.35
                    }}
            >
                <source src="/hero_section.mp4" type="video/mp4"/>
            </video>
            
            <Typography variant="h1" sx={{ fontWeight: 'bold', color:"secondary.dark" }}>
                AI Travel Planner
            </Typography>
            <Typography variant="h6" sx={{ m: 2, fontWeight:"bold"}}>
                BUILD & PLAN your personalized Itinerary in seconds.
            </Typography>
            <Typography variant="Subtitle2" sx={{ m: 2, fontWeight:"bold", color: "primary.dark" }}>
                Destinations, activities and experiences tailored for you.
            </Typography>
            <Link to="/itinerary/form">
                <Button variant="contained" size="large" sx={{ maxWidth:"50%", m:"auto" }}>
                    Generate My Itinerary
                </Button>
            </Link>
        </Box>
    )
}