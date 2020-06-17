const UserRepository = require('../../data/repositories/userRepository');
const {salt} = require('../../env').app;
const CryptoJS = require("crypto-js");

function encryptPassword(password) {
    return CryptoJS.PBKDF2(password, salt, {
        keySize: 128 / 32
    }).toString();
}

class UserService {
    getAll() {
        return UserRepository.getAll();
    }

    updateUser(id, data) {
        if (data.hasOwnProperty('password')) {
            data.password = encryptPassword(data.password)
        }

        return UserRepository.updateById(id, data);
    }

    postUser(data) {
        data.password = encryptPassword(data.password)

        return UserRepository.create(data);
    }

    deleteUser(id) {
        return UserRepository.deleteById(id)
    }

    async validatePassword(userName, password) {
        const user = await UserRepository.search({userName});
        const encryptedPassword = encryptPassword(password);

        if (!user) {
            return false;
        }
        return user.password === encryptedPassword;
    }

}

module.exports = new UserService();