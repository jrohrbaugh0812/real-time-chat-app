// database_scripts/inserts/userInsert.js
const { pool } = require('../../database_scripts/postgres-connection');

async function insertNewUser(username, email, password) {
    try {
        const client = await pool.connect();
        await client.query('INSERT INTO Users (username, email, password_hash) VALUES ($1, $2, $3)', [username, email, password]);
        client.release();
        return { success: true, message: 'Registration successful' };
    } catch (error) {
        console.error('Error inserting new user:', error);
        return { success: false, error: 'Internal Server Error' };
    }
}

module.exports = insertNewUser;
