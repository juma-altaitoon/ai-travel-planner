
import { Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset'
import NotFound from './pages/NotFound.jsx';
import { useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from './theme/theme.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { Box } from '@mui/material';
import ForgotPassword from './pages/ForgootPassword.jsx';
import ItineraryForm from './components/ItinerarySearch.jsx';
import GeneratedItinerary from './components/GeneratedItinerary.jsx';


export default function App() {
  const [ mode, setMode ] = useState("dark");
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme= {theme}>
      <Box 
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: (theme) => theme.palette.background.default,
        }}>
        <Header mode={mode} setMode={setMode}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset/:reserToken" element={<PasswordReset />} />

          <Route path='/Itinerary/form' element={<ItineraryForm/>}/>
          <Route path='/Itinerary/generated' element={<GeneratedItinerary/>}/>

          <Route path="/404" element={<NotFound />} />
          <Route path='/*' element={<Navigate to="/404"/> } />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  )   
}