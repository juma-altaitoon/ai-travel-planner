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
import { Axios } from 'axios';

export default function ForgotPassword () {
    const [ email, setEmail] = useState("");
    const { forgotPassword, message } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setEmail(event.target.value);
    }

    const handleResetRequest = async (event) => {
        event.preventDefault();

        try {
            await forgotPassword(email);
            navigate("/"); 
                
        } catch (error) {
            console.error(error.message)        
        }

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
                    Request Password Reset 
                </Typography>
                <Box component='form' onSubmit={handleResetRequest} noValidate sx={{ mt: 2 }}>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        type='email'
                        autoFocus
                        onChange={handleChange}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}