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
        <Box display={"flex"} alignItems={"center"} p={1} m={1} >
            <TextField 
                fullWidth
                multiline
                variant="standard"
                minRows={1}
                maxRows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter you prompt here..."
            />

            <IconButton onClick={handleSend} sx={{ m:1 }}>
                <SendIcon />
            </IconButton>
        </Box>
    )
}