import React from 'react';
import { Box, Container, Grid, ImageListItem, Paper, Stack, Typography } from '@mui/material';

export default function About() {
    return (
        <>
            <Container maxWidth="md" sx={{ bgcolor: "primary.light", height: "80vh", my:2, display: "flex", gap: 2, p: 1, justifyContent:"center", alignItems: "center", flexGrow: 1, borderRadius:5 }}>
                <Paper size={{xs: 12, md:6}} elevation={16} square={false} sx={{ bgcolor: "primary.dark", minHeight:"90%", minWidth:"50%", borderRadius:5, display:"flex", flexDirection:"column", justifyContent: "space-evenly", alignItems:"center" }}>
                    <ImageListItem  sx={{ height: "50%", width:"70%", borderRadius:5 }}> 
                        <img loading="lazy" src={"Branding Image 1.png"} />
                    </ImageListItem>
                </Paper>
                <Paper size={{xs: 12, md:6}} elevation={16} square={false} sx={{ bgcolor: "secondary.dark", minWidth:"50%", minHeight:"90%", borderRadius:5, display:"flex", flexDirection:"column", justifyContent: "space-evenly", alignItems:"center", px:4}}>
                    <Stack spacing={6}>
                        <Typography variant='h2'color='primary.dark' fontWeight={700} >
                            About
                        </Typography>
                        <Typography variant="subtitle1" color='primary.light'>
                            Welcome to AI Travel Planner, your intelligent companion for planning unforgettable journeys. We believe travel should be effortless, inspiring, and deeply personal. That's why we built a privacy-first AI platform that helps you discover destinations, craft custom itineraries, and visualize your adventures — all in one place. Whether you're chasing sunsets in Santorini or exploring hidden gems in Kyoto, our app combines smart recommendations with beautiful design to make trip planning feel like part of the adventure.
                        </Typography>
                    </Stack>
                </Paper>
            </Container>
        </>
    )
}