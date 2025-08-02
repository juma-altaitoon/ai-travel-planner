import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import FlightIcon from '@mui/icons-material/Flight';
import LuggageIcon from '@mui/icons-material/Luggage';
import { useNavigate } from "react-router";

export default function WelcomeScreen () {
    const [ loading, setLoading ] = useState(true);
    const [ showGreeting, setShowGreeting ] = useState(false);
    const [ showPrompt, setShowPrompt ] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const loadTimeout = setTimeout(() => setLoading(false), 2000);
        const greetingTimeout = setTimeout(() => setShowGreeting(true), 2200);
        const promptTimeout = setTimeout(() => setShowPrompt(true), 2700);
        const navTimeout = setTimeout(() => navigate("/itinerary", {replace: true}), 4000);
        return () => {
            clearTimeout(loadTimeout)
            clearTimeout(greetingTimeout)
            clearTimeout(promptTimeout)
            clearTimeout(navTimeout)

        }
    }, [navigate])


    if (loading) {
        return (
            <Backdrop open sx={{ color: "primary.main", zIndex: 9999 }}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        );
    }

    return (
        <Box sx={{ textAlign: "center", p: 4, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", background: "linear-gradient(to bottom right, #e3f2fd, #fff)" }}>
            <Box 
            sx={{ 
                opacity: showGreeting ? 1 : 0, 
                transform: showGreeting ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
                <Typography variant="h3" gutterBottom color="primary">
                    Welcome Back {user.username}!
                </Typography>
            </Box>
            <Box 
                sx={{
                    opacity: showPrompt ? 1 : 0, 
                    transform: showPrompt ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    mt: 3,
                }}
            >
                <LuggageIcon
                    sx={{
                        animation: showPrompt ? " bounce 1s ease" : "none",
                        "@keyframes bounce": {
                            "0%": {transform: "translateY(0)" },
                            "5%": {transform: "translateY(-8)" },
                            "100%": {transform: "translateY(0)" },
                        },
                    }}
                />
                <Typography variant="h6" color="secondary">
                     Ready for your next adventure? 
                </Typography>
                <FlightIcon
                    sx={{
                        animation: showPrompt ? "pulse 1.2s ease" : "none",
                            '@keyframes pulse': {
                            '0%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.2)' },
                            '100%': { transform: 'scale(1)' },
            },
                    }}
                />
            </Box>
        </Box>
    );
}