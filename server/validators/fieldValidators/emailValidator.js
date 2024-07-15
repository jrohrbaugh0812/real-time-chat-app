const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || typeof email !== 'string') return false;

    const matchesRegex = emailRegex.test(email);

    return matchesRegex;
};

module.exports = isValidEmail;