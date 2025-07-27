import { Backdrop, Box, CircularProgress, Fade, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import FlightIcon from '@mui/icons-material/Flight';
import LuggageIcon from '@mui/icons-material/Luggage';
import { useNavigate } from "react-router";

export default function WelcomeScreen () {
    const [ loading, setLoading ] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        const timeout = setTimeout(() => {
            navigate("/itinerary", {replace: true})
        }, 4000);
        return () => clearTimeout(timeout)
    }, [navigate])


    if (loading) {
        return (
            <Backdrop open sx={{ color: "primary.main", zIndex: 9999 }}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        );
    }

    return (
        <Box sx={{ textAlign: "center", p: 4 }}>
            <Fade in timeout={500}>
                <Typography variant="h3" gutterBottom color="primary">
                    Welcome Back {user.username}!
                </Typography>
            </Fade>
            <Fade in timeout={1000}>
                <Typography variant="h6" color="secondary" sx={{ my:3, gap: 2 }}>
                    <LuggageIcon/>
                     Ready for your next adventure? 
                    <FlightIcon />
                </Typography>
            </Fade>
        </Box>
    );
}