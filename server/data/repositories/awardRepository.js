const baseRepository = require('./baseRepository');
const {Award} = require('../models/index');

class AwardRepository extends baseRepository {
    constructor() {
        super(Award);
    }

    async setAwardFilm(id, film){
        const award=await this.getById(id);

        award.setFilm(film);
    }

    setAwardFilmCreating(award,film){
        award.setFilm(film);
    }
}

module.exports = new AwardRepository();