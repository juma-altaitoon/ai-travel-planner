import { Box, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";



export default function TypingAction () {

    const typingSteps = [
        "typing", 200,
        "typing...", 400,
        "typing", 200,
        "typing...", 400,
    ]
    return (
        <Box p={1} m={1}>
            <Typography variant="caption" color="textPrimary">
                <TypeAnimation
                    sequence={typingSteps}
                    wrapper="div"
                    cursor={true}
                    repeat={Infinity}
                    style={{ fontSize: "0.75rem" }}
                />
            </Typography>
        </Box>
    )
}