const { pool } = require('../postgres-connection');

async function insertNewUserGroup(user_name, group_id, client = null) {
    let local_client = client; // Use the passed client or create a new one.
    const is_local_client = !client; // Check if a local client needs to be managed.

    try {
        if (is_local_client) {
            local_client = await pool.connect(); // Create a new client if one isn't provided.
        }

        // Fetch user_id based on user_name
        const response = await local_client.query(
            'SELECT * FROM users WHERE username = $1',
            [user_name]
        );

        if (response.rows.length === 0) {
            // Handle case where the user is not found
            return { success: false, error: `User "${user_name}" not found` };
        }

        const user_id = response.rows[0].user_id;

        // Insert into user_groups table
        await local_client.query(
            'INSERT INTO user_groups (user_id, group_id) VALUES ($1, $2)',
            [user_id, group_id]
        );

        return { success: true, message: 'Group member added successfully' };
    } catch (error) {
        console.error('Database error inserting member into group:', error);
        return { success: false, error: 'Internal Server Error' };
    } finally {
        if (is_local_client && local_client) {
            local_client.release(); // Release only if the client was created locally.
        }
    }
}

module.exports = insertNewUserGroup;
