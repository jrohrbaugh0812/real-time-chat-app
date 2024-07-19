const isValidUsername = require('../fieldValidators/usernameValidator');
const isValidEmail = require('../fieldValidators/emailValidator');
const isValidPassword = require('../fieldValidators/passwordValidator');
const checkUserForSignIn = require('../../database_scripts/checks/signInUserCheck');
const hashPassword = require('../../utils/passwordUtils');
const argon2 = require('argon2');

async function isValidSignIn(identifier, password) {
    // Check if password is valid
    if (!isValidPassword(password)) return { valid: false, message: 'Invalid password' };
    
    // Determine if identifier is an email or username
    const isEmail = isValidEmail(identifier);

    // Database check for user existence
    const userCheck = await checkUserForSignIn(identifier, isEmail);

    if (!userCheck.valid) {
        return { valid: false, message: isEmail ? 'This email does not exist' : 'This username does not exist' };
    } else if (userCheck.error) {
        return { valid: false, error: userCheck.error };
    }

    // Verify password
    console.log(userCheck.password);
    const isPasswordValid = await argon2.verify(userCheck.password, password);
    if (isPasswordValid) {
        return { success: true, message: 'Sign in successful' };
    } else {
        return { success: false, message: 'Incorrect password' };
    }
}

module.exports = isValidSignIn;