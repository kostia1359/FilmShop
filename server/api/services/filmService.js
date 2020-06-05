const filmRepository = require('../../data/repositories/filmRepository');
const genreService=require('../services/genreService');
const awardService=require('../services/descriptionService');

class FilmService {
    async getAll() {
        const filmsPromises = await filmRepository.getAll().then(filmList=>{
            return filmList.map(film => {
                return film.dataValues.id;
            });
        }).then(filmIdS=>{
            return filmIdS.map(id=>this.getFilm(id));
        });

        const films=await Promise.all(filmsPromises);

        return films;
    }

    async updateFilm(id, data) {
        if(data.hasOwnProperty('genres')){
            await filmRepository.setFilmGenres(id,data.genres);

            delete data['genres'];
        }

        if(data.hasOwnProperty('award')){
            await filmRepository.setFilmAwards(id,data.award);

            delete data['award'];
        }

        if(data.hasOwnProperty('descriptionId')){
            await filmRepository.setFilmDescription(id,data.descriptionId);

            delete data['descriptionId'];
        }

        return filmRepository.updateById(id, data);
    }

    postFilm(data) {
        return filmRepository.create(data);
    }

    deleteFilm(id) {
        return filmRepository.deleteById(id)
    }

    async getFilm(id) {
        const film = await filmRepository.getById(id).then(data => data.dataValues);
        const genres = await filmRepository.getFilmGenres(id).then(genreList => {
            return genreList.map(genre => {
                genre = genre.dataValues;
                delete genre['FilmGenres'];

                return genre;
            });
        });
        const award = await filmRepository.getFilmAwards(id).then(awardList => {
            return awardList.map(award => {
                award = award.dataValues;
                delete award['filmId'];

                return award;
            });
        })

        return {...film, genres, award};
    }

    async getFilmByID(id){
        const film= await filmRepository.getById(id);

        if(!film) {
            throw Error('film with this id does not exist');
        }

        return film;
    }
}

module.exports = new FilmService();