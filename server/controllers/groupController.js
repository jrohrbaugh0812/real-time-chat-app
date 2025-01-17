const { pool } = require('../database_scripts/postgres-connection');
const insertNewGroup = require('../database_scripts/inserts/groupInsert');
const insertNewUserGroup = require ('../database_scripts/inserts/userGroupInsert');

const createGroup = async (req, res) => {
    const group_name = req.body.groupName;
    const user_ids = req.body.user_ids;

    const client = await pool.connect();
    try {
        await client.query('BEGIN') // Start transaction

        // Insert new empty group and get group_id
        const group_response = await insertNewGroup(group_name, client);
        if (!group_response.success) throw new Error(group_response.error);
        const group_id = group_response.group_id;

        // Add each user to the new group
        for (const user_id of user_ids) {
            const user_group_response = await insertNewUserGroup(user_id, group_id, client);
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