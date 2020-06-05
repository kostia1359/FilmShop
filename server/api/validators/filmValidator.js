const {createValid, updateValid} = require('./validator');
const genreService=require('../services/genreService');
const awardService=require('../services/awardService');
const descriptionService=require('../services/descriptionService');

const createValidator={
    filmName: function (str) {
        if (str.length === 0) {
            throw Error('filmName should not be empty');
        }

        return str;
    },
    rating: function (str) {
        const isNumeric = /^[0-9]+$/.test(str);
        const filmRating = Number(str);

        if (!isNumeric) {
            throw Error(`rating should be a number`);
        }

        if (filmRating < 1 || filmRating > 10) {
            throw Error('film rating should be in range (1,10)');
        }

        return Number(str);
    },
    year: function (str) {
        const isNumeric = /^[0-9]+$/.test(str);

        if (!isNumeric) {
            throw Error(`year should be a number`);
        }

        return Number(str);
    },

    genres: async function (str) {
        if(str.trim().length===0) return null;
        let filmGenres=str.split(/\s*,\s*/);

        const genrePromises=filmGenres.map(genreID=>{
            const id=validateNumericalID(genreID,'genre');

            return genreService.getGenre(id);
        })

        filmGenres = await Promise.all(genrePromises).catch(error=> {
            throw error;
        });

        return filmGenres;
    },
    descriptionId: async function (str) {
       const id = validateNumericalID(str);

        const description= await descriptionService.getDescription(id);

        return description;
    },
    award:async function (str) {
        if(str.trim().length===0) return null;
        let filmAwards=str.split(/\s*,\s*/);

        const awardPromises=filmAwards.map(awardID=>{
            const id=validateNumericalID(awardID,'award');

            return awardService.getAward(id);
        })

        filmAwards = await Promise.all(awardPromises).catch(error=> {
            throw error;
        });

        return filmAwards;
    }
}


const createFilmValid = async (req, res, next)=>{
    const filmToValidate=req.body;

    try {
        res.data=await createValid(createValidator,filmToValidate);
        next();
    }catch (e) {
        res.err=e;
        next('error');
    }
}

const updateFilmValid = async (req, res, next)=>{
    const filmToValidate=req.body;

    console.error('updating', req.body);
    try{
        res.data= await updateValid(createValidator,filmToValidate);
        next();
    }catch (e) {
        res.err=e;
        next('error');
    }

}

module.exports={updateFilmValid,createFilmValid};


function validateNumericalID(id, fieldName) {
    const isNumeric = /^[0-9]+$/.test(id);

    if (!isNumeric) {
        throw Error(`${fieldName} ID should be a number`);
    }

    return Number(id);
}