import React from 'react';
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router';

export default function ItineraryCard ({ id, title, subtitle, imageUrl, onView  }) {

    return (
        <>
            <Link to={`/itinerary/${id}`} style={{ textDecoration: "none" }}>
                <CardActionArea onClick={onView} sx={{ borderRadius: 16, transition: "0.2s", "&:hover": { transform: "scale(1.1)" } }}> 
                    <Card sx={{  minWidth: 100, borderRadius: 16, boxShadow: "none", "&:hover": { boxShadow: "0 6px 12px 0 green " } }}>
                        <CardMedia
                            component= "img"
                            src={imageUrl ? imageUrl : "image_placeholder.png" }
                            sx={{ 
                                width: "100%",
                                height: "100%",
                                p: "20%",  
                                bgcolor: "rgba (0,0,0,0.08)"
                            }}
                        />
                        <CardContent sx={{ bgcolor: "primary.main", p: 1 }}>
                            <Typography variant="body1" sx={{ color: "#fff", textTransform: "uppercase" }}>{title}</Typography>
                            <Typography variant='subtitle2' sx={{ mx: 2, mt: 1, color: '#fff', opacity: 0.85, }} >{subtitle}</Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </Link>
        </>
    )
}