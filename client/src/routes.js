// routes.js: this file sets up the routing for the applicaiton using React Router.

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

// This is the main function of the file. It defines the routes for the application.
function AppRoutes() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            try {
                const decoded = jwt_decode(token);
                if(decoded.exp * 1000 > Date.now()) {
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('token');
            }
        }
    })

    return (
        <Router>
            <Routes>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/auth" exact>
                    {isAuthenticated ? <Redirect to="/dashboard" /> : <AuthPage />}
                </Route>
                <Route path="/dashboard" exact>
                    {isAuthenticated ? <Dashboard /> : <Redirect to="/auth" />}
                </Route>
            </Routes>
        </Router>
    )
}


export default AppRoutes;