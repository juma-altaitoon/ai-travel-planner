import React, { useState } from 'react';
import{ Container, Paper, Stack, Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormLabel, FormControlLabel, FormGroup, Checkbox, Button, Typography, Divider } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CountrySelect from './CountrySelect';
import { TabPanel, a11yProps } from './TabPanel';

const preferencesOptions = [
    "Cultural",
    "Adventure",
    "Relaxation",
    "Foodie",
    "Nature",
    "Family-friendly",
    "Sports",
    "Sightseeing"
];

export default function ItineraryForm(){
    const [ form, setForm ] = useState({
        country: '',
        city: '',
        startDate: null,
        endDate: null,
        duration: 1,
        preferences: [],
        budget: '',
        additionalRequest: '',
    })

    const handleChange = (event) => {
        const data = { ...form };
        data[event.target.name] = event.target.value;
        setForm(data);
    }

    const handleCheckboxChange = (event, preference) => {
        let prefs = [...form.preferences];
        if (event.target.checked) {
            if (!prefs.includes(preference)) {
                prefs.push(preference);
            }
        } else {
            prefs = prefs.filter((pref) => pref !== preference );
        }

        const data = {...form};
        data.preferences = prefs;
        setForm(data);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
    }
 

    return (
        <Container maxWidth='sm' component={Paper} sx={{ display: "flex", justifyContent:"center" }}>
            <Box maxWidth={600} component="form" onSubmit={handleSubmit} sx={{ p: 4 }} >
            {/* Itinerary Form */}
                <Typography variant='h4' fontWeight="bold" color="secondary.dark" textAlign="center" m={2}>
                    Itinerary Form
                </Typography>
                <Divider/>
                <Grid container spacing={4}>
                    <Grid size={{xs:12, sm: 12 }} sx={{ mt: 5, mb: 3 }}>
                        <CountrySelect fullWidth/>
                    </Grid>
                    <Grid size={{xs:12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="City / Region"
                            name="city"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{xs:12, sm: 5 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            fullWidth
                            label="Start Date"
                            name='startDate'
                            value={form.startDate}
                            onChange={handleChange}
                        />
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={{xs:12, sm: 5 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            fullWidth
                            label="End Date"
                            name='endDate'
                            value={form.endDate}
                            onChange={handleChange}
                        />
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={{xs: 12, sm: 2 }}>
                        <TextField
                            type='number'
                            label="Duration"
                            name= "duration"
                            value={form.duration}
                            onChange={handleChange}
                            security=""
                        />
                    </Grid>
                    <Grid size={{xs:12, sm: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel>Budget</InputLabel>
                            <Select name='budget' value={form.budget} label="Budget" onChange={handleChange}>
                                <MenuItem value="low">Low</MenuItem>
                                <MenuItem value="mid">Mid</MenuItem>
                                <MenuItem value="high">High</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{xs:12, sm: 12 }}>
                        <FormControl component="fieldset" fullWidth>
                            <FormLabel>Preferences</FormLabel>
                            <FormGroup row>
                                {preferencesOptions.map((option) => (
                                    <FormControlLabel
                                        key={option}
                                        control={
                                            <Checkbox
                                                checked={form.preferences.includes(option)}
                                                onChange={(e) => handleCheckboxChange(e, option)}
                                            />
                                        }
                                        label={option}
                                        sx={{ color: "secondary.main" }}
                                    />
                                ) )}
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid size={{xs:12, sm: 12 }}>
                        <TextField
                            label="Additional Request"
                            multiline
                            rows={3}
                            name="additionalRequest"
                            fullWidth
                            value={form.additionalRequest}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
                        <Button  variant="contained" color="primary" type="submit">
                            Submit Itinerary
                        </Button>
                    </Grid>
                </Grid>
            
            </Box>
        </Container>
    )
}