import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import App from "./App.jsx";
import Admin from "./pages/admin/admin.jsx";
import HomeAdmin from "./pages/admin/home.admin.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import EventAdmin from "./pages/admin/events.admin.jsx";
import CommunityPosts from "./pages/CommunityPosts.jsx";
import Events from "./pages/Events.jsx";
import SingleEvent from "./pages/SingleEvent.jsx";
import Profile from "./pages/Profile.jsx";
import AuthProvider from "./services/authProvider.jsx";
import CertificateAdmin from "./pages/admin/certificate.admin.jsx";
import VolunteerList from "./pages/admin/volunteers.admin.jsx";
import EventAttendancePage from "./pages/admin/attendance.admin.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "events",
                element: <Events />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "/app",
        element: <ProtectedRoute />,
        children: [
            {
                path: "events/:id",
                element: <SingleEvent />,
            },
            {
                path: "community",
                element: <CommunityPosts />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
        ],
    },
    {
        path: "/admin",
        element: <Admin />,
        children: [
            {
                path: "",
                element: <HomeAdmin />,
            },
            {
                path: "events",
                element: <EventAdmin />,
            },
            {
                path: "volunteers",
                element: <VolunteerList />,
            },
            {
                path: "certificate",
                element: <CertificateAdmin />,
            },
            {
                path: "attendance",
                element: <EventAttendancePage />,
            },
        ],
    },
]);
AOS.init({
    duration: 1200,
});
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>,
);
