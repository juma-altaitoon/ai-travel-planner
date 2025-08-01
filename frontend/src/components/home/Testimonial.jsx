import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';

const testimonialList = [
    { name: 'Leila H.', quote: 'The itinerary it gave me was spot-on—and beautifully designed!' },
    { name: 'Yusuf A.', quote: 'Finally, an AI that understands how I travel.' },
    { name: 'Amara K.', quote: 'Planning with privacy and flexibility? Love it.' }
]

export default function Testimonials(){
    
    return (
        <Box sx={{ py: 10, px: 10, minHeight: "100vh" }}>
            <Typography variant="h4" color='text.primary' sx={{ textAlign: "center", my: 4 }}>
                What our traveler's say
            </Typography>
            <Grid container spacing={0} justifyContent={"center"} >
                {testimonialList.map((testimonial, i) => (
                    <Grid size={{xs:12, md:4}} key={i} >
                        <Box  sx={{ justifyContent: "center", textAlign: "center", bgcolor: "primary.main", m:2, p:4, borderRadius: "10px", "&:hover": { border: "2px solid", borderColor: "secondary.dark", bgcolor: "GrayText" } }}>
                            <Avatar sx={{ mx: "auto", mb: 2, color:"text.secondary", bgcolor:"background.paper", fontStyle:"bold" }}>
                                {testimonial.name[0]}
                            </Avatar>
                            <Typography variant="body1" sx={{ fontStyle: "italic", m:2 }}>
                                {testimonial.quote}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ my:1, fontStyle:"bold", color:"text.primary" }} >
                                - {testimonial.name}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}