const baseRepository = require('./baseRepository');
const {User}=require('../models/index');

class UserRepository extends baseRepository {
    constructor() {
        super(User);
    }
}

module.exports = new UserRepository();