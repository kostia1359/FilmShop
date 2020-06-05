const filmRepository = require('../../data/repositories/filmRepository');

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

    updateFilm(id, data) {
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
}

module.exports = new FilmService();