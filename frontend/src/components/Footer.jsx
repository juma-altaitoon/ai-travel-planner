import React from "react";
import { Box, Container, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';


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
            }}
        >
            <Container maxWidth="md" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between"  }}>
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} AI Travel Planner. All rights reserved.
                </Typography>
                <Box>
                    <IconButton href="#" rel="noopener" aria-label="Facebook">
                        <FacebookIcon/>    
                    </IconButton>
                    <IconButton href="#" rel="noopener" aria-label="Instagram">
                        <InstagramIcon/>    
                    </IconButton>
                    <IconButton href="#" rel="noopener" aria-label="X">
                        <XIcon/>    
                    </IconButton>
                </Box>
            </Container>

        </Box>
    )
};

