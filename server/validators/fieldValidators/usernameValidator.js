const isValidUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    const minLength = 3;
    const maxLength = 18;

    if(!username || typeof username !== 'string') return false;
    
    const isValidLength = username.length >= minLength && username.length <= maxLength;
    const matchesRegex = usernameRegex.test(username);

    return isValidLength && matchesRegex;
};

module.exports = isValidUsername;