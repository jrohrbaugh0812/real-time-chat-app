require('dotenv').config({path:__dirname+'/.env'})
const express = require('express'); // Import Express
const app = express(); // Create an Express application
const bodyParser = require('body-parser');
const { pool, connectToDB } = require('./database_scripts/postgres-connection');
const authRoutes = require('./routes/authRoutes');

// Establish connection to postgres db.
connectToDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', authRoutes);

// Start the server on port 5000
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});