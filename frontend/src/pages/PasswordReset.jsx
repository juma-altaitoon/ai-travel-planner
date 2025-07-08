import { 
    Container, 
    Typography,
    Box, 
    TextField,
    Button,
    Avatar,
    IconButton,
    InputAdornment
} from '@mui/material';
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutline'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AuthContext from '../context/AuthContext';
import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function PasswordReset () {
    const { passwordReset, message } = useContext(AuthContext);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
    const [ resetData, setResetData ] = useState({});
    const [ errors, setErrors ] = useState({});
    const navigate = useNavigate();
    const { resetToken } = useParams();

    const validate = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,32}$/ ;
        let errorMessages = {};

        if (!resetToken) {
            errorMessages.resetToken = "Link Invalid"
        }
        if (!resetData.password) {
            errorMessages.password = "Password is required";
        } else if (resetData.password.length < 12 ) {
            errorMessages.password = "Password must be at least 12 characters";
        } else if (!passwordRegex.test(resetData.password)) {
            errorMessages.password = "Password should contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character";
        }
        if (resetData.password !== resetData.confirmPassword){
            errorMessages.confirmPassword = "Passwords do not match";
        }
        return errorMessages;
    }

    const handleChange = (event) => {
        const data = { ...resetData };
        data[event.target.name] = event.target.value;
        setResetData(data);
    }

    // Password Visibility
    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword((show) => !show);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handlePasswordReset = async (event) => {
        event.preventDefault();
        const errorMessages = validate();
        setErrors(errorMessages);
        if(Object.keys(errors) > 0) {
            return ;
        }
        try {
            resetData["resetToken"] = resetToken
            await passwordReset(resetData);
            console.log()
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
                    Enter New Password
                </Typography>
                <Box component='form' onSubmit={handlePasswordReset} noValidate sx={{ mt: 2 }}>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='password'
                        label='Password'
                        name='password'
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
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='confirmPassword'
                        label='Confirm Password'
                        name='confirmPassword'
                        onChange={handleChange}
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
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Reset Password
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}