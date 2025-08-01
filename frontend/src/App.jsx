
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
import ItineraryForm from './components/itineraryForm/ItinerarySearch.jsx';
import GeneratedItinerary from './components/itineraries/GeneratedItinerary.jsx';
import Itineraries from './pages/Itineraries.jsx';
import ItineraryDetails from './pages/ItineraryDetails.jsx';
import ProtectedRoute from './context/ProtectedRoute.jsx';
import Profile from './pages/Profile.jsx';
import ChatPage from './pages/ChatPage.jsx';
import Planner from './pages/Planner.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import Contact from './pages/Contact.jsx';


export default function App() {
  const [ mode, setMode ] = useState("dark");
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme= {theme} noSsr>
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
          <Route path="/reset/:resetToken" element={<PasswordReset />} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/user' element={<Profile />} />
          <Route path='/chat' element={<ChatPage/>} />

          <Route element={<ProtectedRoute/>} >
            <Route path='/welcome' element={<WelcomeScreen/>}/>
            <Route path='/Itinerary' element={<Itineraries/>}/>
            <Route path='/Itinerary/:id' element={<ItineraryDetails/>}/>
            <Route path='/Itinerary/form' element={<ItineraryForm/>}/>
            <Route path='/Itinerary/generated' element={<Planner/>}/>
            
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path='/*' element={<Navigate to="/404"/> } />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  )   
}