import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import AuthContext from "./AuthContext";
import { CircularProgress } from "@mui/material";

export default function ProtectedRoute() {
    const { isAuthenticated, checkingAuth } = useContext(AuthContext);

    if (checkingAuth) {
        return (
            <CircularProgress/>
        )
    }

    return isAuthenticated ? <Outlet/> : <Navigate to='/login' />
};
