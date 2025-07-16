import { 
    Container, 
    Typography,
    Box, 
    Checkbox,
    TextField,
    Button,
    Avatar,
    FormControlLabel,
    Link as MuiLink,
    IconButton,
    InputAdornment
} from '@mui/material';
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutline'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AuthContext from '../context/AuthContext';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

export default function Login () {
    const [ userLogin, setUserLogin ] = useState({})
    const {login, message } = useContext(AuthContext);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ errors, setErrors ] = useState({})
    const navigate = useNavigate();


    const validate = () => {
        let errorMessages = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
        // Email Validation
        if (!userLogin.email){
            errorMessages.email = "Email is required";
        } else if (!emailRegex.test(userLogin.email)) {
            errorMessages.email = "Invalid email address";
        }
        // Password validation
        if (!userLogin.password) {
            errorMessages.password = "Password is required";
        } else if (userLogin.password.length < 12 ) {
            errorMessages.password = "Password must be at least 12 characters";
        }
        return errorMessages
    }

    const handleChange = (event) => {
        const user = { ...userLogin };
        user[event.target.name] = event.target.value;
        setUserLogin(user);
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        const errorMessages = validate();
        setErrors(errorMessages)
        try {
            // if (Object.keys(errors).length > 0) {
            //     return ;
            // }
            console.log(userLogin);
            await login(userLogin);
            console.log(message);
            navigate("/itinerary")
        } catch (error) {
            console.error(error.message);
            setErrors({ form: "Login failed. Please check your credentials."});
        }
    }

    // Password Visibility
    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    return(
        <Container maxWidth='xs'>
            <Box
                sx={{
                    mt: 8,
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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5' color='textPrimary'>
                    Login to AI Travel Planner
                </Typography>
                <Box component='form' onSubmit={handleLogin} noValidate sx={{ mt: 2 }}>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='password'
                        label='Password'
                        name='password'
                        autoComplete='current-password'
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
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
                    {errors.form && (
                        <Typography color="error" sx={{ mt: 1}}>
                            {errors.form}
                        </Typography>
                    )}
                    <FormControlLabel
                        control={<Checkbox value='remember' color='secondary' />} 
                        label='Remember me'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Grid container >
                        <Grid xs>
                            <MuiLink href='/forgot-password' >Forgot password</MuiLink>
                        </Grid>
                        <Grid >
                            <MuiLink href="/signup" >{"Don't have an account? Sign up."}</MuiLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}