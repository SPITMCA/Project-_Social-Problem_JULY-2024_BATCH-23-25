import { Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import { useContext, useEffect } from "react";
import authService from "./services/auth.service";
import AuthContext from "./services/authContext";

function App() {
    const { setUser } = useContext(AuthContext);
    useEffect(() => {
        setUser(authService.getCurrentUser());
    }, []);

    return (
        <div className="h-screen bg-slate-100">
            <Nav />
            <Outlet />
        </div>
    );
}

export default App;
