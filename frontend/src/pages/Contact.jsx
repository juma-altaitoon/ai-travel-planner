import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Box, Button, TextField, Typography, Grid, Paper, Stack, Snackbar, Alert} from '@mui/material';
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const BACKEND_URL = import.meta.env.VITE_API_URL;

const sendMessage = async (data) => {
    
    await Axios.post(BACKEND_URL+"/contact/send", data)
        .then(() => {
            console.log("Message Sent");
        })
        .catch((error) => {
            console.error("Message Error ", error.message)
        })
};


export default function Contact() {

    const [ contactMessage, setContactMessage ] = useState({});
    const [ snackbarOpen, setSnackbarOpen ] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const msg = {...contactMessage};
        msg[event.target.name] = event.target.value;
        setContactMessage(msg);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await sendMessage(contactMessage);
            setSnackbarOpen(true);
            setContactMessage({ name: "", email: "", message: "" });
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error("Error Sending Message: ", error.message);
        }
    }

    return (
        <Box id="contact" sx={{ p:4, bgcolor: "background", color:"text.primary", height: "80vh", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 5 }}>
            <Paper elevation={3} sx={{ p:4, maxWidth: 500, width: "100%", borderRadius: "20px", boxShadow: `0 10px 50px 5px grey` }}>    
                <Box sx={{  display:'flex', gap:2, alignItems: "center", justifyContent: "center", mb: 3 }}>
                    <SupportAgentIcon fontSize="large" color="primary" />
                    <Typography variant='h5' fontWeight={500}>Contact Us</Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
                    <Grid container spacing={3}>
                        <Grid size={{xs: 12}}>
                            <TextField label="Name" margin="normal" required fullWidth autoCapitalize="on" name="name" value={contactMessage.name} onChange={handleChange} />
                            <TextField label="Email" margin="normal" required fullWidth type="email" name="email" value={contactMessage.email} onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12}}>
                            <TextField fullWidth label="Message" placeholder="Enter you message here..." multiline minRows={5} required autoCapitalize="on" name="message" value={contactMessage.message} onChange={handleChange} />    
                        </Grid> 
                    </Grid>
                    <Grid size={{ xs: 12}} sx={{ textAlign: "center" }}>
                        <Button variant='contained' color='primary'type='submit' sx={{ m:2, px:5 }}> 
                            Send Message
                        </Button>
                    </Grid>    
                </Box>
            </Paper>
            <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                <Alert severity='success' sx={{ width: '100%'}}>

                </Alert>
            </Snackbar>
        </Box>
    )
}