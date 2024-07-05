require('dotenv').config({path:__dirname+'/.env'})
const express = require('express'); // Import Express
const { pool, connectToDB } = require('./dbConnection/postgres-connection');
const app = express(); // Create an Express application

// Establish connection to postgres db.
connectToDB();

// Define a route for Get requests to "/api" --just an example block for now--.
app.get("/api/users", async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Users');
        client.release(); // Release the client back to the pool
        res.json(result.rows); // Send JSON response with fetched users
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server on port 5000
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});