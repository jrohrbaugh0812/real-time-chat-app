// File which establishes connection to postgres database.

const { Pool } = require('pg');

// Create a new pool instance with configuration details from .env variables.
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

async function connectToDB() {
    try {
        await pool.connect();
        console.log('Connected to PostgreSQL');
    } catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
    }
}

module.exports = { pool, connectToDB };