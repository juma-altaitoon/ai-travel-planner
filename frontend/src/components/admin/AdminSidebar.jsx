import React from 'react';
import { Dashboard, People, Mail, RateReview, BarChart } from '@mui/icons-material';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, } from '@mui/material';


import { useNavigate, useLocation } from 'react-router';

const navItems = [
    { label: "Dashboard", icon: <Dashboard/>, path: "/admin" },
    { label: "Users", icon: <People/>, path: "/admin/users" },
    { label: "Messeges", icon: <Mail/>, path: "/admin/messages" },
    { label: "Testimonials", icon: <RateReview/>, path: "/admin/testimonials" },
    { label: "Analytics", icon: <BarChart/>, path: "/admin/analytics" },
];

export default function AdminSidebar () {
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <Drawer>
            <Toolbar/>
            <List>
                {navItems.map(({ label, icon, path })=> (
                    <ListItemButton key={label} selected={location.pathname === path} onClick={() => navigate(path)} >
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={label} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    )
}