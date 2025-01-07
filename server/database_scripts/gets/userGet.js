const { pool } = require('../postgres-connection');
const isValidEmail = require('../../validators/fieldValidators/emailValidator');

async function getUserByEmailOrUsername(identifier) {
    const client = await pool.connect();

    try {
        const query = isValidEmail(identifier) 
            ? 'SELECT * FROM Users WHERE email = $1' 
            : 'SELECT * FROM Users WHERE username = $1';

        const result = await client.query(query, [identifier]);

        if(result.rows.length > 0) {
            return result.rows[0];
        } else {
            return null;
        }

    } catch (error) {
        console.error('Error checking database:', error);
        return { error: 'Database error' };
    } finally {
        client.release();
    }
}

async function getUserById(identifier) {
    const client = await pool.connect();

    identifier = parseInt(identifier, 10); // Ensure base 10
    if (isNaN(identifier) || !Number.isInteger(identifier) || identifier <= 0) {
        return { error: "Invalid ID" };
    }
    
    try {
        const query = 'SELECT * FROM Users WHERE user_id = $1';

        const result = await client.query(query, [identifier]);

        if(result.rows.length > 0) {
            return result.rows[0];
        } else {
            return null;
        }

    } catch (error) {
        console.error('Error checking database:', error);
        return { error: 'Database error' };
    } finally {
        client.release();
    }
}

module.exports = {
    getUserByEmailOrUsername,
    getUserById
};