const baseRepository = require('./baseRepository');
const {Award} = require('../models/index');

class AwardRepository extends baseRepository {
    constructor() {
        super(Award);
    }
}

module.exports = new AwardRepository();