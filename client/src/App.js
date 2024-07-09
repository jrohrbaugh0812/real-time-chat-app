// App.js: This file acts as the main entry point of the entire React application.

import React from 'react';
import AppRoutes from './routes';
import Navbar from './components/Navbar';

// This is the main function of the program. It renders the main structure of the application.
function App() {

    return (
        <div>
            <Navbar />
            <AppRoutes />
        </div>
    );
}

export default App;
