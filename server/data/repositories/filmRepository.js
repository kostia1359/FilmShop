const baseRepository = require('./baseRepository');
const {Film} = require('../models/index');

class FilmRepository extends baseRepository {
    constructor() {
        super(Film);
    }

    async getFilmAwards(id){
        const film=await this.getById(id);

        return await film.getAwards();
    }

    async getFilmGenres(id){
        const film=await this.getById(id);

        return await film.getGenres();
    }

    async setFilmGenresCreating(film,genres){
        await film.setGenres(genres);
    }

    async setFilmAwardsCreating(film,award){
        await film.setAwards(award);
    }

    async setFilmDescriptionCreating(film,description){
        await film.setDescription(description);
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

module.exports = new FilmRepository();