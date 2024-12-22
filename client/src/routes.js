// routes.js: this file sets up the routing for the applicaiton using React Router.

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import { isTokenValid } from './utils/authUtils';

// This is the main function of the file. It defines the routes for the application.
function AppRoutes() {
    const [isAuthenticated, setIsAuthenticated] = useState(isTokenValid());

    useEffect(() => {
        if (isAuthenticated) {
            const interval = setInterval(async () => {
                const token = localStorage.getItem('token');
                if (token) {
                    try {
                        const response = await fetch('/protected-route', {
                            headers: { 'Authorization': token },
                        });
                        if (!response.ok) {
                            localStorage.removeItem('token');
                            setIsAuthenticated(false);
                        }
                    } catch (error) {
                        console.error('Token validation failed:', error);
                        localStorage.removeItem('token');
                        setIsAuthenticated(false);
                    }
                }
            }, 60000); // Check every 60 seconds
        
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={isAuthenticated ? <Navigate to="/dashboard" /> : <AuthPage />} />
                <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/auth" />} />
            </Routes>
        </Router>
    );
}


export default AppRoutes;