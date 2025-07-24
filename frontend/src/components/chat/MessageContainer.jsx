import { Box, Paper, Typography } from "@mui/material";


export default function MessageContainer ({role, content}){
    const isUser = role === "user";

    return (
        <Box display={"flex"} justifyContent={isUser ? "flex-end" : "flex-start"} m={1}>
            <Paper elevation={3} sx={{ maxWidth: "70%", p: 1, bgcolor: (isUser ? "secondary.dark" : "primary.dark"), borderRadius: 3}} >
                <Typography variant="body1" whiteSpace="pre-line" >
                    {content}
                </Typography>
            </Paper>
        </Box>
    )
}