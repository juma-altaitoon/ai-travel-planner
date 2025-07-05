import React from "react";
import { Box, Container, Typography } from '@mui/material';

export default function Footer() {

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 1,
                mt: 'auto',
                backgroundColor: (theme) => 
                    theme.palette.mode === "dark"
                        ? theme.palette.grey[900]
                        : theme.palette.grey[200],
                textAlign: 'center',                
            }}>
                <Container maxWidth="md">
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} AI Travel Planner. All rights reserved.
                    </Typography>
                </Container>

        </Box>
    )
};

