import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>  
    <Router>
      <AuthProvider>
        <CssBaseline enableColorScheme/> 
        <App />
      </AuthProvider>    
    </Router>
  </StrictMode>,
)
