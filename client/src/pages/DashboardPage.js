import React, { useState, useEffect } from 'react';
import '../css/global.css';
import '../css/pages-css/DashboardPage.css';

function DashboardPage() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in local storage');
                return;
            }

            const userId = JSON.parse(atob(token.split('.')[1])).id;
            const url = `api/user/${userId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await response.json();
            if (response.ok) {
                setUserData(result); // Update state
                console.log(userData);
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            setIsLoading(false); // Will stop the loading text and load the page contents.
        }
        return '';
    }

    useEffect(() => {
        getUserData(); // Fetch user data on component mount.
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Show loading screen while data is being fetched
    }

    if (!userData) {
        return <div>Error loading user data.</div>; // Show error if user data is null
    }

    return (
        <div className="dashboard-page">
            <div className="user-box">
                <img src="/images/default-account-icon.png" alt="Profile" className="profile-picture" />
                <h3 className="username">{userData.username}</h3>
            </div>
        </div>
    )
}

export default DashboardPage;