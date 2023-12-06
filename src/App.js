import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AdminDashboard from "./pages/AdminDashboard";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './authProcess/auth/login/Login';
import Auth from './authProcess/auth/Auth';
import ProtectedRoute from './util/ProtectedRoute';
import Campaigns from "./pages/Campaigns";
import Team from "./pages/Team";
import TalentDashboard from "./pages/TalentDashboard";
import Register from "./authProcess/auth/login/Register";
import AgencySettings from "./pages/agencySettings/AgencySettings";
import CampaignDetail from "./pages/CampaignDetail";
import ResetPassword from "./pages/resetPassword";
import GuestVideoPlayer from "./components/videoPlayer/GuestVideoPlayer";
import Security from "./pages/agencySettings/Security";
import AdminSettings from "./pages/agencySettings/adminSettings";
import ErrorBoundary from "./components/ErrorBoundary";
import InviteSignUp from "./pages/InviteSignUp";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);




    const checkUserToken = async () => {
        console.log("Checking");
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <BrowserRouter basename={''}>
            <ErrorBoundary>
                <Routes>
                    <Route path='campaigns' element={
                        <ProtectedRoute>
                            <Campaigns />
                        </ProtectedRoute>
                    } />
                    <Route path='resetPassword' element={
                        <ResetPassword />
                    } />
                    <Route path='home' element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path='team' element={
                        <ProtectedRoute>
                            <Team></Team>
                        </ProtectedRoute>
                    } />
                    <Route path='talent' element={
                        <ProtectedRoute>
                            <TalentDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path='agencySettings' element={
                        <ProtectedRoute>
                            <AgencySettings />
                        </ProtectedRoute>
                    } />

                    <Route path='/agencySettings/agency' element={
                        <ProtectedRoute>
                            <AdminSettings />
                        </ProtectedRoute>
                    } />

                    <Route path='agencySettings/security' element={
                        <ProtectedRoute>
                            <Security />
                        </ProtectedRoute>
                    } />

                    <Route path='' element={
                        <ProtectedRoute>
                            <Login />
                        </ProtectedRoute>
                    } />
                    <Route path='campaign/:contractId' element={
                        <ProtectedRoute>
                            <CampaignDetail />
                        </ProtectedRoute>
                    } />
                    <Route path='registerInvite/:inviteToken' element={
                        <InviteSignUp />
                    }
                    ></Route>
                    <Route path="guestDashboard/:inviteToken"
                        element={
                            <GuestVideoPlayer />
                        }
                    />
                    <Route path='*' element={<Auth />}>
                        <Route path='login' element={<Login />} />
                    </Route>
                    <Route path='register' element={
                        <Register />}
                    >

                    </Route>
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    );
}
export default App;