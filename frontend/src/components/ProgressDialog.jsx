import React from "react";
import { TypeAnimation } from 'react-type-animation';
import { Dialog, DialogTitle, DialogContent, CircularProgress, Typography, Box, LinearProgress } from '@mui/material';

export default function ProgressDialog({ open, onCancel, steps=[] }) {

    return (
        <Dialog open={open} onClose={onCancel} disableEscapeKeyDown aria-describedby='itinerary-loading'>
            <DialogTitle id="itinerary-loading">
                Generating You Itinerary
            </DialogTitle>            
            <DialogContent sx={{ alignItems: "center"}}>
                <CircularProgress/>
                <Box sx={{ minWidth: 300, my: 2 }}>
                    <TypeAnimation
                        sequence={steps}
                        wrapper="div"
                        cursor={true}
                        repeat={0}
                        style={{ fontSize: "1rem", lineHeight: 1.5 }}
                    />
                    
                </Box>
                <LinearProgress color="primary"/>
            </DialogContent>
        </Dialog>
    )
}