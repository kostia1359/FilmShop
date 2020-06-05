const filmService=require('../server/api/services/filmService');
const genreService=require('../server/api/services/genreService');
const awardService=require('../server/api/services/awardService');
const descriptionService=require('../server/api/services/descriptionService');

const assert = require('assert');
const Sequelize = require('sequelize');
const config = require("../server/config/dbConfig");
const associate = require('../server/data/db/associations');

const orm = new Sequelize(config);

const Film = require('../server/data/models/film')(orm, Sequelize);
const Award = require('../server/data/models/award')(orm, Sequelize);
const Description = require('../server/data/models/description')(orm, Sequelize);
const Genre = require('../server/data/models/genre')(orm, Sequelize);

associate({Film, Award, Description, Genre});
before(async function() {

    await (async () => {
        await orm.sync({logging: false, force: true});
        const description = await Description.create({description: 'Really awesome film'});
        const [genreFantasy, genreComedy,genreTerrible] = await
            Promise.all([
                Genre.create({genreName: 'fantasy'}),
                Genre.create({genreName: 'comedy'}),
                Genre.create({genreName: 'terrible'})]
            );
        const [oscar, Lion]=await
            Promise.all([
                Award.create({awardName:'Oscar',nominationName:'Graphics',year:1999}),
                Award.create({awardName:'Lion',nominationName:'Scenary',year:2000})
            ])
        const avengers=await Film.create({filmName:'Avengers',year:1998,rating:9});
        avengers.setDescription(description);
        avengers.addGenres([genreFantasy,genreTerrible]);
        avengers.setAwards([oscar,Lion]);
    })();
});

describe('Services', function() {
    describe('#getAll', function() {
        it('should return 1', async function() {
            const films= await filmService.getAll();
            assert.strictEqual(films.length, 1);
        });
    });
    describe('#getFilm', function() {
        it('should return name of the first film(Avengers)', async function() {
            const films= await filmService.getFilmByID(1);
            assert.strictEqual(films.filmName, 'Avengers');
        });
    });
    describe('#updateFilm', function() {
        it('should return name of the first film(Avengers)', async function() {
            await filmService.updateFilm(1,{filmName:'Mstiteli'});
            const film= await filmService.getFilm(1);
            assert.strictEqual(film.filmName, 'Mstiteli');
        });
    });
    describe('#updateAward', function() {
        it('film should have one award and award 2 should not be assigned to any film', async function() {
            await filmService.updateFilm(1,{award:[1]});
            const film= await filmService.getFilm(1);
            const award=await awardService.getAward(2);
            assert.strictEqual(film.award.length, 1);
            assert.strictEqual(award.filmId, null);
        });
    });
    describe('#postGenre', function() {
        it('the length of genres should be 4', async function() {
            await genreService.postGenre({genreName:"pricol"});
            const genreList=await genreService.getAll();
            assert.strictEqual(genreList.length, 4);
        });
    });

});