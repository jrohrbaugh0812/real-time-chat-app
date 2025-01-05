import React from 'react';
import '../css/global.css';
import '../css/pages-css/DashboardPage.css';

function DashboardPage() {
    return (
        <div className="dashboard-page">
            <div className="user-box">
                <img src="/images/default-account-icon.png" alt="Profile" className="profile-picture" />
                <h3 className="username">Username</h3>
            </div>
        </div>
    )
}

export default DashboardPage;