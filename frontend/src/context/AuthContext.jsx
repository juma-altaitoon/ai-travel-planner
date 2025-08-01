import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router';
import Axios from 'axios';
import propTypes from 'prop-types';
import { Alert, Snackbar } from '@mui/material';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const BACKEND_URL = import.meta.env.VITE_API_URL;
    
    // Initial Authentication state
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ user, setUser ] = useState(null);
    const [ message, setMessage ] = useState('');
    const [ snackbarOpen, setSnackbarOpen ] = useState(false);
    const [ snackbarSeverity, setSnackbarSeverity ] = useState("info");  
    const [ checkingAuth, setCheckingAuth ] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is Authenticated (if token is valid)
        const checkAuth = async () => {
            await Axios.get(BACKEND_URL+"/auth/check", { withCredentials: true })
                .then((response) => {
                    if (response.data.user) {
                        setIsAuthenticated(true);
                        setUser(response.data.user);
                    }
                })
                .catch ((error) => {
                    console.error("Failed Authentication: ", error.message );
                    setIsAuthenticated(false);
                    setUser(null);
                })
                .finally(() => {
                    setCheckingAuth(false);
                })
        };
        checkAuth();
    }, [user]);

    const showSnackbar = (message, severity = "info") => {
        setMessage(message);
        setSnackbarSeverity(severity)
        setSnackbarOpen(true);
    }
    
    // Signup function
    const signup = async (userData) => {
        try {
            const response = await Axios.post(BACKEND_URL+"/auth/signup", userData)
            console.log(response.data);
            showSnackbar("Signup Successful.", "success");
            // Snackbar goes here
            setTimeout(() => {
                navigate("/login", {replace: true});    
            }, 2000);
        } catch (error) {
            console.error( "Signup Failed: ", error.message );
            showSnackbar("Signup Failed! Please try again later.", "error");
            // Snackbar goes here
        }
    }
    
    // Login function
    const login = async (userData) => {
        await Axios.post(BACKEND_URL+"/auth/login", userData, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setIsAuthenticated(true);
                setUser(response.data.user);
                showSnackbar("Login Successful.", "success");
                navigate("/");
            })
            .catch((error) => {
                console.error("Login Failed: ", error.respose?.data || error.message );
                showSnackbar("Login Failed, please try again later", "error");
            })
    };

    
    const logout = async () => {
        
        await Axios.post(BACKEND_URL+"/auth/logout", {}, { withCredentials: true })
            .then(() => {
                setIsAuthenticated(false);
                setUser(null);
                showSnackbar("Logout Successful.", "success");
                navigate("/");
            })
            .catch ((error) => {
                console.error("Logout Failed: ", error);
                showSnackbar("Logout Failed.", "error");
            })
    }

    const forgotPassword = async (email) => {
        await Axios.post(BACKEND_URL+"/auth/forgot-password", email)
            .then((response) => {
                console.log("Successful password reset request", response.data);
                showSnackbar("Password reset request sent", "success");
            })
            .catch((error) => {
                console.error("Password reset request error: ", error.message);
                showSnackbar("Password reset request failed.", "error")
            })
    }

    const passwordReset = async (resetData) => {
        await Axios.post(BACKEND_URL+"/auth/reset-password", resetData , {withCredentials: true})
            .then((response) => {
                console.log("Successful password reset", response.data);
                showSnackbar("Password reset successful", "success");
            })
            .catch((error) => {
                console.error("Password reset error: ", error.message);
                showSnackbar("Password reset failed.", "error")
            })
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signup, login, logout, message, passwordReset, forgotPassword, showSnackbar, checkingAuth }}>
            {children}
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={()=> setSnackbarOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} >
                    {message}
                </Alert>
            </Snackbar>
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children : propTypes.node.isRequired,
}

export default AuthContext;