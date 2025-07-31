import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";
import { TypeAnimation } from "react-type-animation";

const cities = [
    "Paris",
    "London",
    "New York",
    "Tokyo",
    "Barcelona",
    "Rome",
    "Dubai",
    "Istanbul",
    "Singapore",
    "Bangkok",
    "Hong Kong",
    "Los Angeles",
    "Amsterdam",
    "San Francisco",
    "Sydney",
    "Cape Town",
    "Rio de Janeiro",
    "Mumbai",
    "Mexico City",
    "Cairo",
    "Manama"
];

const typingSequence = cities.map(city => (
    [ city, 2000 ]
)).flat();



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
            justifyContent: "space-evenly",
            alignItems: "center",
        }}>
            <Typography variant="h1" sx={{ fontWeight: 'bold', color:"secondary.dark", zIndex: 1 }}>
                AI Travel Planner
            </Typography>
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
                    opacity: 0.9
                    }}
            >
                <source src="/hero_section.mp4" type="video/mp4"/>
            </video>
            
            
            <Typography variant="h5" sx={{ m: 2, fontWeight:"bold", zIndex: 1, color: "primary.main"}}>
                BUILD & PLAN your personalized Itinerary in seconds.
            </Typography>
            <Typography variant="h4" sx={{ m: 2, fontWeight:"bold", color: "blue", zIndex: 1, bgcolor: "lightgrey", opacity: 0.6, maxWidth: "md", borderRadius: 4 }}>
                Explore&nbsp;
                <TypeAnimation
                    sequence={typingSequence}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    style={{ fontWeight: "bold" }}
                />
            </Typography>
            <Link to="/itinerary/form">
                <Button variant="contained" size="large" sx={{ maxWidth:"50%", mx:"auto", my: 2, borderRadius: 10 }}>
                    Generate Your Itinerary
                </Button>
            </Link>
        </Box>
    )
}