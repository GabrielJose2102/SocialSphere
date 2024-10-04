// library encrypt 
const bcrypt = require('bcryptjs');
const encrypt = {};

// encrypt password for saved in database
encrypt.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

// compare password with password database
encrypt.matchPassword = async (password, savePassword)=> {
    try {
        return await bcrypt.compare(password, savePassword);
    } catch (error) {
        console.error(error)
    }
}

module.exports = encrypt;