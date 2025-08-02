import { Box, Button, Container, Divider, Grid, Typography, Fab, TextField, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const getProfile = async () => {
    try {
        const res = await Axios.get(BACKEND_URL+"/user/profile", { withCredentials: true });
        if(res.data.user) {
            return res.data.user
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
    const [ avatar, setAvatar ] = useState(null);
    const [ avatarPreview, setAvatarPreview ] = useState(null);
    

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const userProfile = await getProfile();
                setUser(userProfile);
                if (userProfile.avatar){
                    console.log(`${BACKEND_URL}/${userProfile.avatar}`)
                    setAvatarPreview(`${BACKEND_URL}/${userProfile.avatar}`);
                }        
                console.log("User profile succcessfully fetched")
            } catch (error) {
                console.error("Error fetching user profile: ", error.message)
                setUser(null);
            }
        }
        loadProfile();
    }, [isEdit])

    // Edit Handler (Switch between edit and profile mode)
    const handleEdit = () => {
        setIsEdit(!isEdit);
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if(!file){
            return;
        }
        setAvatar(file);
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
        const formData = new FormData();
        Object.entries(user).forEach(([key, value]) => {
            formData.append(key, value);
        })
        if (avatar) {
            formData.append("avatar", avatar)
        }

        try {
            await updateProfile(formData)
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
            
            <Box display="flex" flexDirection="row" flexWrap={{xs: "wrap", sm: "nowrap"}} gap={5} sx={{ m: 2, p: 2}}>
                <Box justifyContent={"center"} alignItems={"center"}>
                    <Avatar src={avatarPreview || undefined} sx={{ width: 120, height: 120, mx: "auto", my: 2, border: "2px solid", borderColor: "primary.light", boxShadow: "0 0 20px 0 grey" }} >
                        {!avatarPreview && <PersonRoundedIcon fontSize='large'/>}
                    </Avatar>
                    <Box>
                        { isEdit &&
                        <Button
                                component='label'
                                variant='outlined'
                                startIcon={<CloudUploadRoundedIcon />}
                            >
                                Update Avatar
                                <input
                                    type='file'
                                    hidden
                                    accept='"image/*'
                                    onChange={handleAvatarChange}
                                />
                            </Button>
                            }
                    </Box>
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
                                value={user.firstName}
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
                                value={user.lastName}
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