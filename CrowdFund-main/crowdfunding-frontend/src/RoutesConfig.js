// RoutesConfig.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Home from "./Pages/Home";
import RiseNow from "./Pages/RiseNow";
import FundraiserForm from "./Pages/FundraiserForm";
import AdminApproval from './Pages/AdminApproval';
import MyRequests from './Pages/MyRequests';
import ExportPage from './Pages/ExportPage';

const RoutesConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/RiseNow" element={<RiseNow />} />
            <Route path="/RaiserForm" element={<FundraiserForm/>}/>
            <Route path='/AdminApproval' element={<AdminApproval/>}/>
            <Route path='/your-requests' element={<MyRequests/>}/>
            <Route path='/export' element={<ExportPage/>}/>
            {/* Add more routes as needed */}
        </Routes>
    );
}

export default RoutesConfig;
