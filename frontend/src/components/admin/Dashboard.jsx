import React from "react";

// import { useQuery } from '@tanstack/react-query';
import { Box, Grid, Typography } from "@mui/material";
import StatCard from "./StatCard";



export default function Dashboard() {
    
    
    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Overview 
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs:12, sm: 6, md: 3}}>
                    <StatCard label={"Total Users"} value={null} />
                </Grid>
                <Grid size={{ xs:12, sm: 6, md: 3}}>
                    <StatCard label={"New Messages"} value={null} />
                </Grid>
                <Grid size={{ xs:12, sm: 6, md: 3}}>
                    <StatCard label={"Testimonials"} value={null} />
                </Grid>
                <Grid size={{ xs:12, sm: 6, md: 3}}>
                    <StatCard label={"Itineraries"} value={null} />
                </Grid>
            </Grid>


        </Box>
    )
}