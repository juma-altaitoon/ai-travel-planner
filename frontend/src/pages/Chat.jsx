import React from "react";
import { Box, Container } from '@mui/material';

export default function Chat () {
    return (
        <Box sx={{ display: "flex", flexDirection:"column", height: "80vh", bgcolor: "background.paper" }}>
            <Box sx={{ flex: 1, overflow: "auto", scrollBehavior:"smooth", p: 2, m: 2, border: "3px solid", borderRadius: 5, borderColor: "secondary.light", boxShadow:"0 0px 10px 10px white" }}  >
                
            </Box>
            <Box>
                {/* input bar */}
            </Box>
        </Box>
    )
}