const { pool } = require('../postgres-connection');

async function getUserGroupsByUserId(user_id) {
    const client = await pool.connect();

    try {
        const result = client.query('SELECT * FROM user_groups WHERE user_id=$1', [user_id]);

        if (result.rows.length > 0) {
            return result.rows;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error checking database:', error);
        return { error: 'Database error' }
    } finally {
        client.release();
    }
}

module.exports = getUserGroupsByUserId;