const argon2 = require('argon2');

async function hashPassword(password) {
    try {
        return await argon2.hash(password);
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Error hashing password');
    }
}

module.exports = hashPassword;