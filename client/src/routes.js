// routes.js: this file sets up the routing for the applicaiton using React Router.

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

// This is the main function of the file. It defines the routes for the application.
function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
            </Routes>
        </Router>
    )
}


export default AppRoutes;