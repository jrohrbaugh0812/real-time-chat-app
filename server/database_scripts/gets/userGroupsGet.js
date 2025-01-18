const { pool } = require('../postgres-connection');

// This function is fetching data from both the user_groups table and the groups table in order to 
// return a list of group data for each group id that corresponds to the passed user id.
async function getUserGroupData(user_id) {
    const client = await pool.connect(); // Connect to the database

    try {
        const result = await client.query('SELECT * FROM user_groups ug INNER JOIN groups g ON ug.group_id = g.group_id WHERE ug.user_id = $1', [user_id]); // Await the query

        return result.rows.length> 0 ? result.rows : null;
    } catch (error) {
        console.error('Error checking database:', error);
        return { error: 'Database error' }; // Return an error object if an exception occurs
    } finally {
        client.release(); // Release the database client back to the pool
    }
}

module.exports = getUserGroupData;
