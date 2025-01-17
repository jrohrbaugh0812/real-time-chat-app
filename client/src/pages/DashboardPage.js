import React, { useState, useEffect } from 'react';
import '../css/global.css';
import '../css/pages-css/DashboardPage.css';

function DashboardPage() {
    // To track user data and whether it has loaded in.
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // To track when the user is creating a group.
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [memberNames, setMemberNames] = useState(['']); 

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

    // This is what determines if the create group form is showing.
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    }

    const createGroup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/group', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({groupName, user_ids: memberNames}),
            })
            const result = await response.json();
            if (response.ok) {
                console.log(result.message);
                toggleModal(); // Close the modal.
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error('Error creating group:', error);
        }
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

    if (!isModalVisible) {
        return (
            <div className="dashboard-page">
                <div className="user-box">
                    <img src="/images/default-account-icon.png" alt="Profile" className="profile-picture" />
                    <h3 className="username">{userData.username}</h3>
                    <h4>Recent Chats:</h4>
                    <ul>
                        <li>No recent chats</li>
                    </ul>
                    <button onClick={toggleModal}>Start a new chat!</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="modal-overlay">
                <div className="modal">
                    <h2>Create new group!</h2>
                    <form onSubmit={createGroup}>
                        <label>
                            Group Name:
                            <input 
                                type="text"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Members (up to 20):
                            {memberNames.map((name, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            const updatedMembers = [...memberNames];
                                            updatedMembers[index] = e.target.value;
                                            setMemberNames(updatedMembers);
                                        }}
                                        required
                                    />
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setMemberNames(memberNames.filter((_, i) => i !== index));
                                            }}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            {memberNames.length < 20 && (
                                <button
                                    type="button"
                                    onClick={() => setMemberNames([...memberNames, ''])}
                                >
                                    Add Member
                                </button>
                            )}
                        </label>
                        <button type="submit">Create Group</button>
                        <button type="button" onClick={toggleModal}>Cancel</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default DashboardPage;