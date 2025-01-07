const { getUserById } = require('../database_scripts/gets/userGet');

const getUserInfo = async (req, res) => {
    try {
        const userId = req.params.id;

        // Fetch user data from the database
        const userData = await getUserById(userId);

        if (userData) {
            console.log(userData);
            res.status(200).json(userData); // Send user data back to the client.
        } else {
            res.status(404).json({error: 'User not found'}); // Handle case where user not found.
        }
    } catch (error) {
        console.error('Error fetching user information: ', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

const updateUserInfo = async (req, res) => {

}

module.exports = {
    getUserInfo,
    updateUserInfo
}