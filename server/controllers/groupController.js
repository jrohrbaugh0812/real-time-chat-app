const { pool } = require('../database_scripts/postgres-connection');
const insertNewGroup = require('../database_scripts/inserts/groupInsert');
const insertNewUserGroup = require ('../database_scripts/inserts/userGroupInsert');

const createGroup = async (req, res) => {
    const group_name = req.body.groupName;
    const usernames = req.body.usernames;

    const client = await pool.connect();
    try {
        await client.query('BEGIN') // Start transaction

        // Insert new empty group and get group_id
        const group_response = await insertNewGroup(group_name, client);
        if (!group_response.success) throw new Error(group_response.error);
        const group_id = group_response.group_id;

        // Add each user to the new group
        for (const username of usernames) {
            const user_group_response = await insertNewUserGroup(username, group_id, client);
            if (!user_group_response.success) throw new Error(user_group_response.error);
        }

        await client.query('COMMIT') // Commit transaction
        return { success: true, message: 'Group and members created successfully.' };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating group:', error);
        return { success: false, message: 'Failed to create group' };
    } finally {
        client.release();
    }
};

module.exports = {
    createGroup
}