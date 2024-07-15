const { pool } = require('../postgres-connection');

async function checkIfUserExists(username, email) {
    const client = await pool.connect();
    try {
        console.log('Starting database check...');

        const usernameResult = await client.query('SELECT * FROM Users WHERE username = $1', [username]);
        const emailResult = await client.query('SELECT * FROM Users WHERE email = $1', [email]);

        console.log('Finished database check');

        if (usernameResult.rows.length > 0) return { valid: false, message: 'Username already exists' };
        if (emailResult.rows.length > 0) return { valid: false, message: 'Email already exists' };

        return { valid: true, message: 'No existing users'};
    } catch (error) {
        console.error('Error checking database:', error);
        return { valid: false, message: 'Database error' };
    } finally {
        client.release(); // Release the client back to the pool
    }
}

module.exports = checkIfUserExists;