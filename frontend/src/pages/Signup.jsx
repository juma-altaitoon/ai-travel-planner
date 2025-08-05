import React from 'react';
import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { Typography, Container, Box, Avatar, Divider, Grid, Button, Fade, CircularProgress } from '@mui/material';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import CountrySelect from '../components/itineraryForm/CountrySelect';
import { uploadToCloudinary } from '../util/cloudinaryUpload';
import Axios from 'axios';


const BACKEND_URL = import.meta.env.VITE_API_URL;

export default function Signup() {
    const [ newUser, setNewUser ] = useState({});
    const [ showPassword, setShowPassword ] = useState(false);
    const [ confirmPassword, setConfirmPassword ] = useState(null);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const { signup } = useContext(AuthContext);
    const [ showForm,  setShowForm ] = useState(true);
    // const [ avatar, setAvatar ] = useState(null);
    const [ avatarPreview, setAvatarPreview ] = useState(null);
    const [ countryObject, setCountryObject ] = useState(null);
    const [ uploading, setUploading ] = useState(false);
    
    // Snackbar state
    // const [ openSB, setOpenSB ] = useState(false);


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

    // Signup input validation
    const validate = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i ;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,32}$/ ;
        let errorMessages = {}
        if (!newUser.firstName){
            errorMessages.firstName = "First Name is required";
        }
        if (!newUser.lastName){
            errorMessages.lastName = "Last Name is required";
        }
        if (!newUser.username){
            errorMessages.username = "Username is required";
        }
        if (!newUser.email){
            errorMessages.email = "Email is required";
        }
        else if ((!emailRegex.test(newUser.email))) {
            errorMessages.email = "Invalide email address";
        }
        if (!newUser.password) {
            errorMessages.password = "Password is required";
        } else if (newUser.password.length < 12 ) {
            errorMessages.password = "Password must be at least 12 characters";
        } else if (!passwordRegex.test(newUser.password)) {
            errorMessages.confirmPassword = "Password should contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character";
        }
        if (newUser.password !== confirmPassword){
            errorMessages.confirmPassword = "Passwords do not match";
        } 
        return errorMessages
    }

    const handleCountryChange = (name, value) => {
        setCountryObject(value)
        const data = { ...newUser};
        data[name] = value.label;
        setNewUser(data);
    }

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if(!file){
            return;
        }
        setUploading(true);
        try {
            const signedData = await Axios.get(BACKEND_URL+"/cloudinary/sign-upload", { withCredentials: true }).then(res => res.data);
            
            const { url, publicId } = await uploadToCloudinary(file, signedData);
            setAvatarPreview(url);
            // setAvatar(url);
            setNewUser((u) => ({ ...u, avatar: url, avatarPubId: publicId }));
        } catch (error) {
            console.error("Avatar upload error: ", error);
        } finally {
            setUploading(false);
        }
    }

    const handleDOB = (value) => {
        const user = { ...newUser };
        user["dateOfBirth"] = dayjs(value).format('DD/MM/YYYY');
        setNewUser(user);
    }

    const handleChange = (event) => {
        const user = { ...newUser };
        user[event.target.name] = event.target.value;
        setNewUser(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errorMessages = validate();
        setErrors(errorMessages);
        if(Object.keys(errors).length > 0){
            return ;
        }

        setShowForm(false);
        // const formData = new FormData();
        // Object.entries(newUser).forEach(([key, value]) => {
        //     formData.append(key, value);
        // })
        // if (avatar){
        //     formData.append("avatar", avatar);
        // }
        try {    
            await signup(newUser);
            
        } catch (error) {
            console.error( "Signup Error: ", error.message)
        }finally {
            setShowForm(true);
        }
    }


    return (
        <Container maxWidth='sm'>
            <Fade in={showForm} timeout={300}>
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
                    <Box component='form' encType="multipart/form-data" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
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
                                    error={Boolean(errors.firstName)}
                                    helperText={errors.firstName}
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
                                    error={Boolean(errors.lastName)}
                                    helperText={errors.lastName}
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
                                    error={Boolean(errors.username)}
                                    helperText={errors.username}                                
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
                                    error={Boolean(errors.email)}
                                    helperText={errors.email}
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
                                    error={Boolean(errors.password)}
                                    helperText={errors.password}
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
                                    onChange={(value) => setConfirmPassword(value.target.value)}
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
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={errors.confirmPassword}                              
                                />  
                            </Grid>
                            <Grid size={12}>
                                <Divider/>
                            </Grid>
                            <Grid size={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        fullWidth
                                        label="Date of Birth"
                                        value={newUser.dateOfBirth}
                                        onChange={(value) => handleDOB(value)}
                                        disableFuture
                                        // Set minimum age
                                        maxDate={dayjs().subtract(13, "year")}
                                    />
                                </LocalizationProvider>  
                            </Grid>
                            <Grid size={6}>
                                <CountrySelect  
                                    fullWidth
                                    value={countryObject}
                                    onChange={(event, newValue) => handleCountryChange('country', newValue) }
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Box display={"flex"} justifyContent={"center"}>
                                    <Avatar src={avatarPreview} sx={{ width: 80, height: 80, mx: 1 }} >
                                        {!avatarPreview && <PersonRoundedIcon fontSize='large'/>}
                                    </Avatar>

                                    <Button
                                        component='label'
                                        variant='outlined'
                                        startIcon={
                                            uploading 
                                                ? <CircularProgress size={25}/>
                                                : <CloudUploadRoundedIcon />
                                            }
                                        disabled={uploading}
                                        sx={{ mx: "auto" }}
                                    >
                                        {uploading ? "Uploading" : "Upload Avatar"}
                                        <input
                                            type='file'
                                            hidden
                                            accept='"image/*'
                                            onChange={handleAvatarChange}
                                        />
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 2 }}/>
                        <Grid xs={12} sx={{ textAlign: "center", mt: 3 }}>
                            <Button type='submit' variant="contained" size="large" >
                                Submit
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Fade>
        </Container>
    )
}