import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";


export default function ChatInput ({ sendMessage }) {

    const [ content, setContent ] = useState("");

    const handleSend = () => {
        if (content && (content.length > 0)) {
            sendMessage(content);
            setContent("");
        }
    };

    return (
        <Box display={"flex"} alignItems={"center"} p={2} m={2} sx={{ border: "1px solid", borderRadius: 5, borderColor: "secondary.dark" }}>
            <TextField 
                fullWidth
                multiline
                variant="standard"
                minRows={1}
                maxRows={5}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter you prompt here..."
            />

            <IconButton onClick={handleSend} sx={{ m:1 }}>
                <SendIcon />
            </IconButton>
        </Box>
    )
}