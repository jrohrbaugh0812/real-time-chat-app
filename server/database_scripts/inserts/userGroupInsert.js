// database_scripts/inserts/groupInsert.js
const { pool } = require('../postgres-connection');

async function insertNewUserGroup(user_id, group_id) {
    try {
        const client = await pool.connect();
        await client.query(
            'INSERT INTO user_groups (user_id, group_id) VALUES ($1, $2)',
            [user_id, group_id]
        );
        client.release();
        return { success: true, message: 'Group member added successfully' }
    } catch (error) {
        console.error('Database error inserting memeber into group:', error);
        return { success: false, error: 'Internal Server Error' }
    }
}

module.exports = insertNewUserGroup;