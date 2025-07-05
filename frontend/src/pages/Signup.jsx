import React from 'react';
import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { Typography, Container, Box, Avatar, Divider, Grid, Button } from '@mui/material';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Signup() {
    const [ newUser, setNewUser ] = useState({});
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
    const { signup, message } = useContext(AuthContext);
    // Snackbar state
    const [ openSB, setOpenSB ] = useState(false);


    // Password visibility control
    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword((show) => !show);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleChange = (event) => {
        const user = { ...newUser };
        user[event.target.name] = event.target.value;
        setNewUser(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = new FormData();
        try {
            console.log(userData)
            await signup(userData)
        } catch (error) {
            console.error( "Signup Error: ", error.message)
        }
    }


    return (
        <Container maxWidth='sm'>
            <Box
                sx={{
                    mt: 8,
                    mb: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <PersonRoundedIcon />
                </Avatar>
                <Typography component='h1' variant='h5' color='textPrimary'>
                    User Signup Information
                </Typography>
                <Divider/>
                <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                        <Grid size={"grow"}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='firstName'
                                label='First Name'
                                name='firstName'
                                autoComplete='firstName'
                                autoFocus
                                onChange={handleChange}
                            />  
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='lastName'
                                label='Last Name'
                                name='lastName'
                                autoComplete='lastName'
                                onChange={handleChange}
                            />  
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='username'
                                label='Username'
                                name='username'
                                autoComplete='username'
                                onChange={handleChange}                                
                            />  
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                type='email'
                                autoComplete='email'
                                onChange={handleChange}
                            />  
                        </Grid>
                        <Grid size={12}>
                            <Divider/>
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='password'
                                label='Password'
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                onChange={handleChange}
                                slotProps={{
                                    input: {
                                        endAdornment:
                                            <InputAdornment position='end' >
                                            <IconButton
                                                aria-label={showPassword ? "Hide password" : "Show password" }
                                                onClick={handleShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge='end'
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                }}
                            />  
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='confirmPassword'
                                label='Confirm Password'
                                name='confirmPassword'
                                type={showConfirmPassword ? 'text' : 'password'} 
                                slotProps={{
                                    input: {
                                        endAdornment:
                                            <InputAdornment position='end' >
                                            <IconButton
                                                aria-label={showConfirmPassword ? "Hide password" : "Show password" }
                                                onClick={handleShowConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge='end'
                                            >
                                                {showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                }}                              
                            />  
                        </Grid>
                        <Grid size={12}>
                            <Divider/>
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='yearOfBirth'
                                label='Year of Birth'
                                name='yearOfBirth'
                                type='number'
                                min="1900"
                                max="2025"
                                onChange={handleChange}
                            />  
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='country'
                                label='Country'
                                name='country'
                                autoComplete='country'
                                onChange={handleChange}
                            />  
                        </Grid>
                        <Grid size={"grow"}>
                            <Button
                                fullWidth
                                component='Input'
                                variant='contained'
                                role={undefined}
                                tabIndex={-1}
                                margin='normal'
                                id='avatar'
                                label='Avatar'
                                name='avatar'
                                type='file'
                                startIcon={<CloudUploadRoundedIcon />}
                            >
                                Upload avatar image
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid size={"grow"} sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
                        <Button type='submit' variant='outlined'>
                            Submit
                        </Button>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}