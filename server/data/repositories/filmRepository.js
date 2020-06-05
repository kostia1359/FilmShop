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

    async addFieldsById(id, data, description, awards, genres) {
        const film = super.updateById(id, data);

        this.addAdditionalInfo(film,description,awards,genres);
    }

    removeFilmAwards(id, awards){
        const film=this.getById(id);

        film.removeAwards(awards);
    }

    removeFilmGenres(id,genres){
        const film=this.getById(id);

        film.removeGenres(genres);
    }

    async getFilmAwards(id){
        const film=await this.getById(id);

        return await film.getAwards();
    }

    async getFilmGenres(id){
        const film=await this.getById(id);

        return await film.getGenres();
    }

    addAdditionalInfo(film, description, awards, genres) {
        film.setDescription(description);
        film.addAwards(awards);
        film.addGenres(genres);
    }


}

module.exports = new AwardRepository();