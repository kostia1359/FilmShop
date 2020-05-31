const baseRepository = require('./baseRepository');
const {Description} = require('../models/index');

class DescriptionRepository extends baseRepository {
    constructor() {
        super(Description);
    }
}

module.exports = new DescriptionRepository();