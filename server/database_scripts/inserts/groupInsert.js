// database_scripts/inserts/groupInsert.js
const { pool } = require('../postgres-connection')

async function insertNewGroup(group_name) {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO groups (group_name) VALUES ($1) RETURNING group_id', 
            [group_name]);
        const group_id = result.rows[0].group_id;
        client.release();
        return { success: true, message: 'Group created successfully', group_id };
    } catch (error) {
        console.error('Database error inserting new group:', error);
        return { success: false, error: 'Internal Server Error' };
    }
}

module.exports = insertNewGroup;