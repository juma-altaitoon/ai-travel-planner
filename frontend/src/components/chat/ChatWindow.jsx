import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import MessageContainer from "./MessageContainer";
import TypingAction from "./TypingAction";

export default function ChatWindow ({ messages, isTyping }) {

    const bottomRef = useRef(null);

    const scrollBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollBottom();
    }, [messages])

    return (
        <Box sx={{ py:2, height: "100%", overflow :"scroll", overflowY: "auto", overflowX:"hidden", scrollBehavior: "smooth", borderRadius: 5, width: "100%" }}>
            <Paper elevation={3} sx={{ maxWidth: "70%", p: 1, bgcolor: "primary.dark", borderRadius: 3}} >
                <Typography variant="body1" whiteSpace="pre-line" color="white" >
                    Hey there! I'm your travel assistant, and I can't wait to help you plan an unforgettable trip. Let's dive into your itinerary and craft something memorable!"
                </Typography>
            </Paper>
            {messages && messages.map((message, index) => (
                message.role !== "system" && <MessageContainer key={index} role={message.role} content={message.content} />
            ))}
            {isTyping && <TypingAction />}
            <div ref={bottomRef} />
        </Box>
    );
}