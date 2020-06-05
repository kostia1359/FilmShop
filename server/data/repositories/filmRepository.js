const baseRepository = require('./baseRepository');
const {Film, Award, Description, Genre} = require('../models/index');

class AwardRepository extends baseRepository {
    constructor() {
        super(Film);
    }

    create(data, description, awards, genres) {
        const film = super.create(data);

        this.addAdditionalInfo(film,description,awards,genres);
    }


    async getFilmAwards(id){
        const film=await this.getById(id);

        return await film.getAwards();
    }

    async getFilmGenres(id){
        const film=await this.getById(id);

        return await film.getGenres();
    }

    setFilmGenresCreating(film,genres){

    }

    async setFilmGenres(id, genres){
        const film=await this.getById(id);

        film.setGenres(genres);
    }

    async setFilmDescription(id, description){
        const film=await this.getById(id);

        film.setDescription(description);
    }

    async setFilmAwards(id, awards){
        const film=await this.getById(id);

        film.setAwards(awards);
    }

}

module.exports = new AwardRepository();