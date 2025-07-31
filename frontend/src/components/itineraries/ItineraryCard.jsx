import React from 'react';
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router';

export default function ItineraryCard ({ tripId, title, subtitle, imageUrl, onView  }) {

    return (
        <>
            <Link to={`/itinerary/${tripId}`} style={{ textDecoration: "none" }}>
                <CardActionArea onClick={onView} sx={{ borderRadius: 5, transition: "0.2s", "&:hover": { transform: "scale(1.1)" } }}> 
                    <Card sx={{ minHeight: "100%", minWidth: 100, borderRadius: 5, boxShadow: "none", "&:hover": { boxShadow: "0 6px 12px 0 green " } }}>
                        <CardMedia
                            component= "img"
                            loading="lazy"
                            src={imageUrl ? imageUrl : "image_placeholder.png" }
                            sx={{ 
                                width: "100%",
                                height: "100%",  
                                bgcolor: "rgba (0,0,0,0.08)"
                            }}
                        />
                        <CardContent sx={{ bgcolor: "primary.main", p: 1 }}>
                            <Typography variant="body2" sx={{ color: "#fff", textTransform: "uppercase" }}>{title}</Typography>
                            <Typography noWrap variant='caption' sx={{ mt: 1, color: '#fff', opacity: 0.85 }} >{subtitle}</Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </Link>
        </>
    )
}