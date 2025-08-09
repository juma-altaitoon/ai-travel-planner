import { Container, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';


export default function Users() {
    

    return (
        <Box>
            <Typography variant="h5" sx={{ my:2 }}>
                Users
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ my: 2 }}>
                <TextField 
                    label="Search"
                    // value={}
                    // onChange={}
                />
            </Stack>

            <Container sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    // rows={}
                    // columns={}
                    // loading={}
                    // paginationMode="server"
                    // rowCount={data?.total || 0}
                    // paginationMode=""
                    // onPaginationModelChange={}
                    // pageSizeOptions={}
                />
                {/* delete dialog  */}
            </Container>
        </Box>
    )
}