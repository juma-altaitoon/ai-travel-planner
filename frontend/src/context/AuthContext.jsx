import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router';
import Axios from 'axios';
import propTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initial Authentication state
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ user, setUser ] = useState(null);
    const [ message, setMessage ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is Authenticated (if token is valid)
        const checkAuth = async () => {
            await Axios.get("/user/profile", { withCredentials: true })
                .then((response) => {
                    if (response.data.authenticated) {
                        setIsAuthenticated(true);
                        setUser(response.data.user);
                    }
                })
                .catch ((error) => {
                    console.error("Failed Authentication: ", error.message );
                })
        };
        checkAuth();
    }, []);
    
    // Signup function
    const signup = async (userData) => {
        await Axios.post("/auth/signup", userData)
            .then((response) => {
                console.log(response.data);
                setMessage("Signup Successful.");
                // Snackbar goes here
                setTimeout(() => {
                    navigate("/login");    
                }, 2000);
            })
            .catch((error) => {
                console.error( "Signup Failed: ", error.message );
                setMessage("Signup Failed! Please try again later.");
                // Snackbar goes here
            })
    }
    
    // Login function
    const login = async (userData) => {
        await Axios.post("/auth/login", userData, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setIsAuthenticated(true);
                setUser(response.data.user);
                setMessage("Login Successful.");
                navigate("/");
            })
            .catch((error) => {
                console.error("Login Failed: ", error.respose.data );
                setMessage("Login Failed, please try again later");
            })
    };

    
    const logout = async () => {
        
        await Axios.post("/auth/logout", {}, { withCredentials: true })
            .then(() => {
                setIsAuthenticated(false);
                setUser(null);
                setMessage("Logout Successful.");
                navigate("/");
            })
            .catch ((error) => {
                console.error("Logout Failed: ", error);
                setMessage("Logout Failed.");
            })
    }

    const forgotPassword = async (email) => {
        await Axios.post("/auth/forgot-password", email)
            .then((response) => {
                console.log("Successful password reset request", response.data);
                setMessage("Password reset request sent");
            })
            .catch((error) => {
                console.error("Password reset request error: ", error.message);
                setMessage("Password reset request failed.")
            })
    }

    const passwordReset = async ({ token, password }) => {
        await Axios.post("/auth/password-reset",{ token, password }, {withCredentials: true})
            .then((response) => {
                console.log("Successful password reset", response.data);
                setMessage("Password reset successful");
            })
            .catch((error) => {
                console.error("Password reset error: ", error.message);
                setMessage("Password reset failed.")
            })
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signup, login, logout, message, passwordReset, forgotPassword }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children : propTypes.node.isRequired,
}

export default AuthContext;