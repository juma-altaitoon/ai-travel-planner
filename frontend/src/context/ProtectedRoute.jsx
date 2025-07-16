import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import AuthContext from "./AuthContext";

const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? <Outlet/> : <Navigate to='/login' />
};

export default ProtectedRoute;