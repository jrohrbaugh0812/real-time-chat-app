const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const minLength = 8;
    const maxLength = 24;

    if(!password || typeof password !== 'string') return false;

    const isValidLength = password.length >= minLength && password.length <= maxLength;
    const matchesRegex = passwordRegex.test(password);

    return isValidLength && matchesRegex;
};

module.exports = isValidPassword;