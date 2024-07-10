// routes.js: this file sets up the routing for the applicaiton using React Router.

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

// This is the main function of the file. It defines the routes for the application.
function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/auth" element={<AuthPage />} />
            </Routes>
        </Router>
    )
}


export default AppRoutes;