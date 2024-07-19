const { pool } = require('../postgres-connection');

async function checkUserForSignIn(identifier, isEmail) {
    const client = await pool.connect();
    try {
        console.log('Starting database check for sign-in...');

        const query = isEmail
            ? 'SELECT * FROM Users WHERE email = $1'
            : 'SELECT * FROM Users WHERE username = $1';

        const result = await client.query(query, [identifier]);

        console.log('Finished database check for sign-in');

        if (result.rows.length > 0) {
            return { valid: true, password: result.rows[0].password_hash };
        } else {
            return { valid: false, message: isEmail ? 'Email does not exist' : 'Username does not exist' };
        }
    } catch (error) {
        console.error('Error checking database:', error);
        return { valid: false, error: 'Database error' };
    } finally {
        client.release();
    }
}

module.exports = checkUserForSignIn;