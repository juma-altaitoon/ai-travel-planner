import { Box, Button, Container, Divider, Grid, Typography, Fab, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import Axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const getProfile = async () => {
    try {
        const data = await Axios.get(BACKEND_URL+"/user/profile", { withCredentials: true });
        if(data.user) {
            console.log(data.user);
            return data.user
        }
    } catch (error) {
        console.error("Error fetching user profile: ", error.message );
        return;
    }
}

const updateProfile = async (userData) => {
    
    await Axios.put(BACKEND_URL+"/user/update", userData, { withCredentials: true })
        .then(() => {
            console.log("User profile updated.");
        })
        .catch((error) => {
            console.error("Profile update failed: ", error)
        })
}

export default function Profile() {
    const [ isEdit, setIsEdit ] = useState(false);
    const [ user, setUser ] = useState(null);
    const [ errors, setErrors ] = useState({});

    useEffect(() => {
        try {
            const userProfile = getProfile();
            setUser(userProfile);
            console.log("User profile succcessfully fetched")
        } catch (error) {
            console.error("Error fetching user profile: ", error.message)
            setUser(null);
        }
    }, [])

    // Edit Handler (Switch between edit and profile mode)
    const handleEdit = () => {
        setIsEdit(!isEdit);
    }

    // Signup input validation
    const validate = () => {
        let errorMessages = {}
        if (!user.firstName){
            errorMessages.firstName = "First Name is required";
        }
        if (!user.lastName){
            errorMessages.lastName = "Last Name is required";
        }
        if (!user.username){
            errorMessages.username = "Username is required";
        } 
        return errorMessages
    }

    const handleChange = (event) => {
        const updatedUser = { ...user };
        updatedUser[event.target.name] = event.target.value;
        setUser(updatedUser);
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errorMessages = validate();
        setErrors(errorMessages);
        if(Object.keys(errors).length > 0){
            return ;
        }
        try {
            await updateProfile(user)
            console.log("User profile successfully updated")
            handleEdit();
        } catch (error) {
            console.error( "Profile update failed: ", error.message)
        }
    }

    return (
    
        <Container maxWidth="md" sx={{ mx: "auto", my: 4, p: 2, bgcolor: "background.paper", borderRadius: 16, display: "flex", flexDirection: "column", justifyContent: 'center' }}>
            <Typography variant="h3" fontWeight={"bold"} textAlign="center" color='primary.main' sx={{ my: 2 }}>
                Profile
            </Typography>
            <Divider>
                {!isEdit &&
                <Fab color="secondary" aria-label="edit" onClick={handleEdit}>
                    <EditIcon />
                </Fab>
                }
            </Divider>
            { user 
                ?
            
            <Box display="flex" flexDirection="row" flexWrap={{xs: "wrap", sm: "nowrap"}} gap={10} sx={{ m: 2, p: 2}}>
                <Box justifyContent={"center"} alignSelf={"center"} sx={{width: "80px", height: "80px"}}>
                    <img src={"image_placeholder.png"} width={"120px"} height={"120px"} />
                </Box>
                <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                    <Grid container rowSpacing={2} columnSpacing={2} >
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                required
                                fullWidth
                                id='firstName'
                                label='First Name'
                                name='firstName'
                                autoFocus
                                onChange={handleChange}
                                error={Boolean(errors.firstName)}
                                helperText={errors.firstName}
                                disabled={!isEdit}
                                value={user.firstname}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                required
                                fullWidth
                                id='lastName'
                                label='Last Name'
                                name='lastName'
                                onChange={handleChange}
                                error={Boolean(errors.lastName)}
                                helperText={errors.lastName}
                                disabled={!isEdit}
                                value={user.lastname}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                required
                                fullWidth
                                id='username'
                                label='Username'
                                name='username'
                                onChange={handleChange}
                                error={Boolean(errors.username)}
                                helperText={errors.username}
                                disabled={!isEdit} 
                                value={user.username}                               
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name="email"
                                value={user.email}
                                disabled
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                id='country'
                                label='Country'
                                name='country'
                                onChange={handleChange}
                                disabled={!isEdit}
                                value={user.country}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                        {/* Update Avatar */}
                        </Grid>
                        {isEdit &&
                            <Grid size={{ xs: 12 }} sx={{my: 2, justifyContent: "center"}}>
                                <Button type='submit' variant='contained' sx={{ mx: "auto"}}>
                                    Update
                                </Button>
                            </Grid>    
                        }
                    </Grid>
                </Box>
            </Box>
            :
                <Typography color="error" variant="h5" align="center" >No User Data</Typography>
            }
        </Container>
    
    )
}