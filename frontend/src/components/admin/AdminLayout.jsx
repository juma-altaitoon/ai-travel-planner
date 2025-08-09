import { Box, Toolbar } from "@mui/material";
import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminToolbar from "./AdminToolbar";


export default function AdminLayout({children}) {
    return(
        <Box sx={{ display: "flex", minHeight: "90vh", bgcolor: "background" }}>
            <AdminSidebar/>
            <Box sx={{ flexGrow: 1 }}>
                <AdminToolbar/>
                <Toolbar/>
                <Box sx={{ p: 3 }}>{children}</Box>
            </Box>
        </Box>
    )
}