import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

export default function AdminToolbar() {
    return(
        <AppBar position="fixed" sx={{ zIndex: 1 }}>
            <Toolbar>
                <Typography variant="h5" sx={{ flexGrow: 1 }} >
                    Admin Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    )
};