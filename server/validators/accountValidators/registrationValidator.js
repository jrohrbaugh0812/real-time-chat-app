const isValidUsername = require('../fieldValidators/usernameValidator');
const isValidEmail = require('../fieldValidators/emailValidator');
const isValidPassword = require('../fieldValidators/passwordValidator');
const checkIfUserExists = require('../../database_scripts/checks/existingUserCheck');

async function isValidRegistration(username, email, password) {
    if (!isValidUsername(username)) return { valid: false, message: 'Invalid username' };
    if (!isValidEmail(email)) return { valid: false, message: 'Invalid email' };
    if (!isValidPassword(password)) return { valid: false, message: 'Invalid password' };

    return checkIfUserExists(username, email);
}

module.exports = isValidRegistration;
