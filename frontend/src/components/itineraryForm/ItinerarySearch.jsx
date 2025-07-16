import React, { useState } from 'react';
import{ Container, Paper, Stack, Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormLabel, FormControlLabel, FormGroup, Checkbox, Button, Typography, Divider } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CountrySelect from './CountrySelect';
import dayjs from 'dayjs';
import Axios from 'axios';
import { useNavigate } from 'react-router';

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
    const BACKEND_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [ countryObject, setCountryObject ] = useState(null);
    const [ form, setForm ] = useState({
        country: null,
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

    const handleDateChange = (name, value) => {
        const data = { ...form};
        data[name] = dayjs(value).toDate()
        setForm(data);
        console.log(form);
    }

    const handleCountryChange = (name, value) => {
        setCountryObject(value)
        const data = { ...form};

        data[name] = value.label;
        setForm(data);
        console.log(form);
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
        console.log(form)
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        console.log(form)
        await Axios.post(BACKEND_URL+'/itinerary/generate', form, {withCredentials: true})
            .then((response) => {
                console.log(response.data)
                const generatedItinerary = response.data.itinerary;
                navigate("/itinerary/generated", { state: { itinerary: generatedItinerary } })
            })
            .catch((error) => {
                console.error("Error generating itinerary: ", error.message)
            })
    }
 

    return (
        <Container maxWidth='sm' component={Paper} sx={{ display: "flex", justifyContent:"center", my: 4 }}>
            <Box maxWidth={600} component="form" onSubmit={handleSubmitForm} sx={{ p: 4 }} >
            {/* Itinerary Form */}
                <Typography variant='h4' fontWeight="bold" color="secondary.dark" textAlign="center" m={2}>
                    Itinerary Form
                </Typography>
                <Divider sx={{ mb: 2 }}/>
                <Grid container spacing={3}>
                    <Grid size={{xs:12, sm: 12 }} sx={{ mt: 5, mb: 3 }}>
                        <CountrySelect
                            fullWidth
                            value={countryObject}
                            onChange={(event, newValue) => handleCountryChange('country', newValue) }
                        />
                    </Grid>
                    <Grid size={{xs:12 }}>
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
                        
                            onChange={(value) => handleDateChange('startDate', value)}
                            // renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={{xs:12, sm: 5 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            fullWidth
                            label="End Date"
                            onChange={(value) => handleDateChange('endDate', value)}
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