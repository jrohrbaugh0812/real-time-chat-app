// AuthPage.js: this file renders the sign-in and register page. It handles both forms and sends the form data server-side to be authenticated and subsequently put into the database.

import React, { useState } from 'react';
import '../css/pages-css/AuthPage.css';
import '../css/global.css';

function AuthPage() {

    // State to manage which form is currently active.
    const [isRegister, setIsRegister] = useState(true);

    const [message, setMessage] = useState('');

    // Toggle between sign-in and register forms.
    const toggleForm = () => {
        setIsRegister(!isRegister);
    };

    const handleSubmit = async (event, formType) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());
        userData.formType = formType;
        console.log(userData);
        
        try {
            const url = '/api/authentication';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
    
            const result = await response.json();
            setMessage(result.message || result.error);
            if (response.ok) {
                console.log(result.message);
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="auth-page">
            <div className="form-container">
                {isRegister ? (
                    <div className="register-form">
                        <h2>Register</h2>
                        <form onSubmit={(event) => handleSubmit(event, 'register')}>
                            <input name="username" type="text" placeholder="Username" required />
                            <input name="email" type="email" placeholder="Email" required />
                            <input name="password" type="password" placeholder="Password" required/>
                            <button type="submit">Register</button>
                        </form>
                        <p>Already have an account? Sign in <span className="highlight" onClick={toggleForm}>here</span></p>
                    </div>
                ) : (
                    <div className="sign-in-form">
                        <h2>Sign In</h2>
                        <form onSubmit={(event => handleSubmit(event, 'signin'))}>
                            <input name="identifier" type="text" placeholder="Email or Username" required />
                            <input name="password" type="password" placeholder="Password" required />
                            <button type="submit">Sign In</button>
                        </form>
                        <p>Don't have an account? Register <span className="highlight" onClick={toggleForm}>here</span></p>
                    </div>
                )}
                <p><hr/>{message}</p>
            </div>
        </div>
    );

}

export default AuthPage;