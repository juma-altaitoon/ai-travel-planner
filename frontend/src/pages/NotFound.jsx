import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router';

export default function NotFound() {
    return (
        <>
            <Typography variant='h1' color='text.primary'>
                Error - 404 : Page Not Found
            </Typography>
            <Link to={"/"}>
                <Button variant="contained" >Go To Homepage</Button>
            </Link>
        </>
    )
}