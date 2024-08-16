import { Outlet } from "react-router";
import Nav from "../../components/Nav";
import SidePanelAdmin from "../../components/SidePanelAdmin";
import { useContext, useEffect } from "react";
import AuthContext from "../../services/authContext";
import authService from "../../services/auth.service";

export default function Admin() {
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        setUser(authService.getCurrentUser());
    }, []);
    return (
        user && (
            <div className="flex h-screen flex-col bg-slate-100">
                <Nav />
                <div className="flex h-full">
                    <SidePanelAdmin />
                    <Outlet />
                </div>
            </div>
        )
    );
}
