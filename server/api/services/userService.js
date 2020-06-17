const UserRepository = require('../../data/repositories/userRepository');
const encryptPassword=require('../../helpers/encryptPassword');

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

    async findUser(search){
        const user=await UserRepository.search(search);

        return user;
    }

    async getUser(id){
        const genre= await UserRepository.getById(id);

        if(!genre) {
            throw Error('user with this id does not exist');
        }

        return genre;
    }
}

module.exports = new UserService();