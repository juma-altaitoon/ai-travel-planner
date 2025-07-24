import { Box } from "@mui/material";
import React from "react";
import MessageContainer from "./MessageContainer";
import TypingAction from "./TypingAction";

export default function ChatWindow ({ messages, isTyping }) {
    return (
        <Box sx={{ py:2, minHeight: "20vh", maxHeight: "60vh", overflow :"scroll", overflowY: "auto", overflowX:"hidden", scrollBehavior: "smooth", borderRadius: 5, width: "100%" }}>
            {messages && messages.map((message, index) => (
                message.role !== "system" && <MessageContainer key={index} role={message.role} content={message.content} />
            ))}
            {isTyping && <TypingAction />}
        </Box>
    );
}