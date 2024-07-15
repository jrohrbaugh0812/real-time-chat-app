const isValidRegistration = require('../validators/accountValidators/registrationValidator');
const insertNewUser = require('../database_scripts/inserts/userInsert');

const authenticate = async (req, res) => {
    try {
        const { formType, username, email, password } = req.body;
        console.log(`Form type: ${formType}, Username: ${username}, Email: ${email}, Password: ${password}`);
        
        if (formType === 'register') {
            console.log('Starting registration check...');
            const validationResult = await isValidRegistration(username, email, password);
            if (!validationResult.valid) {
                console.log(validationResult.message);
                return res.status(400).json({ error: validationResult.message });
            }
            
            // Insert the new user into the database
            const insertionResult = await insertNewUser(username, email, password);
            if (insertionResult.success) {
                return res.status(201).json({ message: insertionResult.message });
            } else {
                return res.status(500).json({ error: insertionResult.error });
            }
        } else if (formType === 'signin') {
            // Sign-in logic here
        } else {
            throw new Error("This form type doesn't exist");
        }
    } catch (error) {
        console.error('There was a problem with authentication:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    authenticate
};
