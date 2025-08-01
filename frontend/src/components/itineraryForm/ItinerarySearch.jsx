import React, { useState } from 'react';
import{ Container, Paper, Stack, Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormLabel, FormControlLabel, FormGroup, Checkbox, Button, Typography, Divider } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CountrySelect from './CountrySelect';
import dayjs from 'dayjs';
import Axios from 'axios';
import { useNavigate } from 'react-router';
import ProgressDialog from '../itineraries/ProgressDialog';

const BACKEND_URL = import.meta.env.VITE_API_URL;

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

const createItineraryChat = async (itinerary) => {
    const chatResponse = await Axios.post(BACKEND_URL+"/chat/itinerary", itinerary, { withCredentials: true })
    const chatId = chatResponse.data.chatId;
    return chatId;
}

const generateItinerary = async (formData) => {
    try {
        const response = await Axios.post(BACKEND_URL+'/itinerary/generate', formData, {withCredentials: true});
        console.log(response.data)
        const generatedItinerary = response.data.itinerary;
        return generatedItinerary;
    } catch (error) {
        console.error("Error generating itinerary: ", error.message)        
    }
}

export default function ItineraryForm(){

    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
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
    });
    
    // Text to be used in the loading animation 
    const typingSteps = [
        "Analyzing your prefrences...", 500,
        "Researching destinations...", 500,
        "Finalizing your plan...", 2000,
    ];

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
        setLoading(true)
        console.log(form)
        try {
            const generatedItinerary = await generateItinerary(form);
            const chatId = await createItineraryChat(generatedItinerary);
            generatedItinerary["chat"] = chatId;
            console.log(generatedItinerary.chat)
            navigate("/itinerary/generated", { state: { itinerary: generatedItinerary, chatId: chatId }, replace: true })    
        } catch (error) {
            console.error("Error generating itinerary: ", error);
            setLoading(false);
            // Error Snackbar
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <Container maxWidth='sm' component={Paper} sx={{ display: "flex", justifyContent:"center", my: 4 }}>
                <Box maxWidth={600} component="form" onSubmit={handleSubmitForm} sx={{ p: 4 }} >
                {/* Itinerary Form */}
                    <Typography variant='h4' fontWeight="bold" color="secondary.dark" textAlign="center" m={2}>
                        Itinerary Form
                    </Typography>
                    <Divider sx={{ mb: 2 }}/>
                    <Grid container spacing={2}>
                        <Grid size={{xs:12, sm: 12 }} sx={{ mt: 5, mb: 3 }}>
                            <CountrySelect
                                fullWidth
                                value={countryObject}
                                onChange={(event, newValue) => handleCountryChange('country', newValue) }
                                required
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
                        <Grid size={{xs:12, sm: 6 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                fullWidth
                                disablePast
                                label="Start Date"
                                required
                                onChange={(value) => handleDateChange('startDate', value)}
                                // renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                            </LocalizationProvider>
                        </Grid>
                        <Grid size={{xs:12, sm: 6 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                fullWidth
                                disablePast
                                label="End Date"
                                required
                                onChange={(value) => handleDateChange('endDate', value)}
                            />
                            </LocalizationProvider>
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
                                Generate Itinerary
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <ProgressDialog open={loading} steps={typingSteps} />
        </>
    )
}