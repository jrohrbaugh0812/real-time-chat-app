// database_scripts/inserts/groupInsert.js
const { pool } = require('../postgres-connection');

async function insertNewUserGroup(user_id, group_id, client=null) {
    let local_client = client; // Use the passed client or create a new one.
    const is_local_client = !client; // Check if a local client needs to be managed
    
    try {
        if (is_local_client) {
            local_client = await pool.connect(); // Create a new client if one isn't provided.
        }
        await local_client.query(
            'INSERT INTO user_groups (user_id, group_id) VALUES ($1, $2)',
            [user_id, group_id]
        );
        
        return { success: true, message: 'Group member added successfully' }
    } catch (error) {
        console.error('Database error inserting memeber into group:', error);
        return { success: false, error: 'Internal Server Error' }
    } finally {
        if (is_local_client && local_client) {
            local_client.release(); // Release only if the client was created locally.
        }
    }
}

module.exports = insertNewUserGroup;