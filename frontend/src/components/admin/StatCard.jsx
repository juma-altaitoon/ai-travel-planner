import { Paper, Skeleton, Typography } from "@mui/material";


export default function StatCard({ label, value = 0, color = "primary" }){

    return (
        <Paper>
            <Typography variant="overline" color="text.secondary" >
                {label}
            </Typography>
            <Typography variant="h4" color={`${color}.main`}>
                {value || <Skeleton width={80}/>}
            </Typography>
        </Paper>
    )
}