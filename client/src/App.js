import React, { useEffect, useState } from 'react';

// Fetch user information from postgres db --just an example block for now--.
function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/api/users")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <div>
           
        </div>
    );
}

export default App;
