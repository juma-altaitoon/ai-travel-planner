import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Box, Button, TextField, Typography, Grid, Paper, Stack} from '@mui/material';


export default function Contact() {

    return (
        <Box id="contact" sx={{ p:4, bgcolor: "background.paper", color:"text.primary", height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={3} sx={{ p:4, maxWidth: 500, width: "100%" }}>    
                <Box sx={{  display:'flex', gap:2, alignItems: "center", justifyContent: "center", mb: 3 }}>
                    <SupportAgentIcon fontSize="large" color="primary" />
                    <Typography variant='h5' fontWeight={500}>Contact Us</Typography>
                </Box>
                <Box component="form" sx={{ width: "100%" }}>
                    <Grid container spacing={3}>
                        <Grid size={{xs: 12}}>
                            <TextField label="Name" margin="normal" required fullWidth autoCapitalize="on" />
                            <TextField label="Email" margin="normal" required fullWidth type="email" />
                        </Grid>
                        <Grid size={{ xs: 12}}>
                            <TextField fullWidth label="Message" placeholder="Enter you message here..." multiline minRows={5} required autoCapitalize="on" />    
                        </Grid> 
                    </Grid>
                    <Grid size={{ xs: 12}} sx={{ textAlign: "center" }}>
                        <Button variant='contained' color='primary'type='submit' sx={{ m:2, px:5 }}> 
                            Send Message
                        </Button>
                    </Grid>    
                </Box>
            </Paper>
        </Box>
    )
}