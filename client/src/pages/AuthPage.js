// AuthPage.js: this file renders the sign-in and register page. It handles both forms and sends the form data server-side to be authenticated and subsequently put into the database.

import React, { useState } from 'react';
import '../css/pages-css/AuthPage.css';
import '../css/global.css';

function AuthPage() {

    // State to manage which form is currently active.
    const [isRegister, setIsRegister] = useState(true);

    // Toggle between sign-in and register forms.
    const toggleForm = () => {
        setIsRegister(!isRegister);
    };

    return (
        <div className="auth-page">
            <div className="form-container">
                {isRegister ? (
                    <div className="register-form">
                        <h2>Register</h2>
                        <form>
                            <input type="text" placeholder="Username" required />
                            <input type="email" placeholder="Email" required />
                            <input type="password" placeholder="Password" required/>
                            <button type="submit">Register</button>
                        </form>
                        <p>Already have an account? Sign in <span className="highlight" onClick={toggleForm}>here</span></p>
                    </div>
                ) : (
                    <div className="sign-in-form">
                        <h2>Sign In</h2>
                        <form>
                            <input type="email" placeholder="Email or Username" required />
                            <input type="password" placeholder="Password" required />
                            <button type="submit">Sign In</button>
                        </form>
                        <p>Don't have an account? Register <span className="highlight" onClick={toggleForm}>here</span></p>
                    </div>
                )}
            </div>
        </div>
    );

}

export default AuthPage;