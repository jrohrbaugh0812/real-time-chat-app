// Navbar.js: this file sets up the navigation bar component which is shown at the top of the screen of every page of the website.

import React from 'react';
import '../css/components-css/Navbar.css';

// Main function of the file, just renders the navigation bar.
function Navbar() {
    return (
        <nav className="navbar">
            <h1>ChatSwiftly</h1>
            <ul>
                <li><a href="/">Home</a></li> |
                <li><a href="/auth">Sign In</a></li> |
                <li><a href="/auth">Register</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;