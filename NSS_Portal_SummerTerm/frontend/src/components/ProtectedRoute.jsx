import { useContext, useEffect } from "react";
import AuthContext from "../services/authContext";
import authService from "../services/auth.service";
import Nav from "./Nav";
import { Outlet } from "react-router";

function ProtectedRoute() {
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        setUser(authService.getCurrentUser());
    }, []);

    return (
        user && (
            <div className="h-screen bg-slate-100">
                <Nav />
                <Outlet />
            </div>
        )
    );
}

export default ProtectedRoute;
