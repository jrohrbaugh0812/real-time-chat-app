const { pool } = require('../postgres-connection');

async function getUserGroupsByUserId(user_id) {
    const client = await pool.connect(); // Connect to the database

    try {
        const result = await client.query('SELECT * FROM user_groups WHERE user_id=$1', [user_id]); // Await the query

        if (result.rows.length > 0) {
            return result.rows; // Return the rows if found
        } else {
            return null; // Return null if no rows found
        }
    } catch (error) {
        console.error('Error checking database:', error);
        return { error: 'Database error' }; // Return an error object if an exception occurs
    } finally {
        client.release(); // Release the database client back to the pool
    }
}

module.exports = getUserGroupsByUserId;
