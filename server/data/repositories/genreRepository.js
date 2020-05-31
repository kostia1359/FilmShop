const baseRepository = require('./baseRepository');
const {Genre} = require('../models/index');

class GenreRepository extends baseRepository {
    constructor() {
        super(Genre);
    }
}

module.exports = new GenreRepository();