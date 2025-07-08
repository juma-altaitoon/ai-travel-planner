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
    const [ data, setData] = useState({});
    const [ errors, setErrors ] = useState({});
    const { forgotPassword, message } = useContext(AuthContext);
    const navigate = useNavigate();

    const validate = () => {
        let errorMessages = {};
        // Email Validation
        if (!data.email){
            errorMessages.email = "Email is required";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(data.email)) {
            errorMessages.email = "Invalid email address";
        }
        return errorMessages;
    }

    const handleChange = (event) => {
        const emailData = {...data}
        emailData[event.target.name] = event.target.value;
        setData(emailData)
        const errorMessages = validate();
        setErrors(errorMessages);
    }

    const handleResetRequest = async (event) => {
        event.preventDefault();
        const errorMessages = validate();
        setErrors(errorMessages);
        if(Object.keys(errors).length > 0){
            return ;
        }
        try {
            await forgotPassword(data);
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
                        error={Boolean(errors.email)}
                        helperText={errors.email}
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