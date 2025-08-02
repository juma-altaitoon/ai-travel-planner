import React from 'react';
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router';

export default function ItineraryCard ({ tripId, title, subtitle, imageUrl, onView  }) {

    return (
        <Card component={Link} to={`/itinerary/${tripId}`} onClick={onView} sx={{ textDecoration: "none", maxWidth: 300, mx: "auto", borderRadius: 5, transition: "transform 0.3s", "&:hover": { transform: "scale(1.1)", boxShadow: 6} }}>
            <CardActionArea borderRadius={5}>
                <CardMedia
                    component= "img"
                    loading="lazy"
                    src={imageUrl || "image_placeholder.png" }
                    alt={title}
                    sx={{ 
                        width: "100%",
                        height: "100%",  
                        bgcolor: "rgba(0,0,0,0.08)",
                        borderRadius: 5
                    }}
                />
                <CardContent sx={{ bgcolor: "primary.main", p: 1, borderRadius:2 }}>
                    <Typography variant="body2" sx={{ color: "secondary.dark", textTransform: "uppercase" }}>{title}</Typography>
                    <Typography variant='caption' sx={{ mt: 1, color: '#fff' }} >{subtitle}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}