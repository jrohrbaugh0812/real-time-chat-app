const isValidRegistration = require('../validators/accountValidators/registrationValidator');
const insertNewUser = require('../database_scripts/inserts/userInsert');
const isValidSignIn = require('../validators/accountValidators/signInValidator');
const getUser = require('../database_scripts/gets/userGet');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username, email: user.email }, secretKey, { expiresIn: '1h' });
};

const authenticate = async (req, res) => {
    try {
        const { formType, username, email, password, identifier} = req.body;
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
            console.log('Starting signin check...');
            const validationResult = await isValidSignIn(identifier, password);

            if (validationResult.success) {
                console.log("SUCCESSFUL SIGN IN!");
                const token = generateToken(await getUser(identifier));
                return res.status(200).json({ message: validationResult.message, token });
            } else {
                return res.status(400).json({ error: validationResult.message || validationResult.error });
            }
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
