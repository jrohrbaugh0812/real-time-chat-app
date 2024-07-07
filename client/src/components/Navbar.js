import React from 'react';
import '../css/components-css/Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <h1>Chat Swiftly</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;