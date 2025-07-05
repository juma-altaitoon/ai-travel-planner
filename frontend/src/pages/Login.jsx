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
    const navigate = useNavigate();

    const handleChange = (event) => {
        const user = { ...userLogin };
        user[event.target.name] = event.target.value;
        setUserLogin(user);
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await login(userLogin);
            console.log(message);
            navigate("/")
        } catch (error) {
            console.error(error.message);
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

                    />
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