import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, } from "@mui/lab";
import { Card, CardContent, Typography, Box, Stack, Chip, IconButton, Divider, Alert, CardHeader, CardMedia } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { timelineItemClasses } from '@mui/lab/TimelineItem';

export default function DailyActivities({ dayActivities }) {
    const activities = [
        { key: 'morning', label: "Morning", color: "primary" },
        { key: 'afternoon', label: "Afternoon", color: "secondary" },
        { key: 'evening', label: "Evening", color: "success" }
    ]

    return (
        <Box>
            <Timeline
                sx={{ 
                    [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                    }, 
                }}
            >
                {activities.map(({key, label, color}) => (
                    <TimelineItem key={key} >
                        <TimelineSeparator>
                            <TimelineDot color={color} />
                            {key !== "evening" && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                            <Card 
                                variant="outlined" 
                                sx={{ 
                                    textAlign: "left", 
                                    mx:"auto", 
                                    my: 2, 
                                    width: { xs: "100%", sm:"100", md: "100%" }, 
                                    border: "2px solid", 
                                    borderColor:"primary.light", 
                                    borderRadius: 5,
                                    "&:hover": {
                                        border: "3px solid",
                                        borderColor: "secondary.dark",
                                        transform: "scale(1.01)",
                                        cursor: "pointer"
                                    }
                                }} 
                            >
                                <CardMedia 
                                    component="img"
                                    height={150}
                                    loading="lazy"
                                    src={dayActivities[key].locationImg.url || "image_placeholder.png"}
                                    sx={{ 
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 5,
                                        boxShadow: 2,
                                        objectFit: "contain"
                                    }}
                                />
                                <CardHeader title={label+" : "} />
                                <CardContent>
                                    <Typography variant="h6">{dayActivities[key].activity}</Typography>
                                    <Chip variant="filled" label={dayActivities[key].location} sx={{ my: 2 }}></Chip>
                                    <Typography variant="body2">{dayActivities[key].description}</Typography>
                                    <Divider sx={{ my: 2}}>
                                        References
                                    </Divider>
                                    <Stack direction={"row"} alignItems={"center"} spacing={1} sx={{ mt: 1 }}>
                                        <Chip label={`Cost: $${dayActivities[key].cost}`} size="small" />
                                        <IconButton href={dayActivities[key].link} target="_blank" >
                                            <LinkIcon />
                                        </IconButton>
                                        <IconButton href={dayActivities[key].youtubeLink} color="error" target="_blank" sx={{ bgcolor: "white" }} >
                                            <YouTubeIcon />
                                        </IconButton>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
            
            <Stack sx={{ py:2, border: "2px solid", borderColor:"primary.dark", borderRadius: 5, "&:hover": { bgcolor:"Highlight" } }}>
                <Divider sx={{ mb: 2, color:"text.primary" }} >Commute</Divider>
                <Stack direction={"row"} flexWrap={"wrap"} rowGap={2} spacing={3} justifyContent="space-around" sx={{ mb:2 }}>
                    {dayActivities.transport.map((mode, idx) => (
                        <Chip key={idx} label={mode} variant="filled" sx={{ my:1}} />
                    ))}
                </Stack>
                {dayActivities.notes && (
                    <Alert variant="standard"  severity="info" sx={{ m:1, borderRadius: 5 }}>
                        {dayActivities.notes}
                    </Alert>
                )}
            </Stack>
        </Box>
    )
}

