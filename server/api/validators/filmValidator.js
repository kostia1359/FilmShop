const {createValid, updateValid} = require('./validator');
const {awardValidator}=require('./awardValidator');

const validator = {
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

    genres:function (str) {
        const filmGenres=str.split(/\s*,\s*/);

        filmGenres.forEach(genre=>{
            if(genre.length===0) {
                throw Error('genre should not be empty');
            }
        })

        return filmGenres;
    },

    award:function (str) {
        let awardName=str.match(/\w+/);
        if(awardName){
            awardName=awardName[0];
        }

        let nominationName=str.match(/(?<=\w+\[)\w+(?=])/);
        if(nominationName){
            nominationName=nominationName[0];
        }
        const year=str.match(/(?<=]\[)\w+(?=])/);

        const createdAward={awardName,nominationName,year};

        try{
            return createValid(awardValidator,createdAward);
        }catch (e) {
            throw Error(`Award is not valid`);
        }
    }
}


const createFilmValid = (req, res, next)=>{
    const filmToValidate=req.body;

    try {
        res.data=createValid(validator,filmToValidate);
        next();
    }catch (e) {
        res.err=e;
        next('error');
    }
}

const updateFilmValid = (req, res, next)=>{
    const filmToValidate=req.body;

    try{
        res.data=updateValid(validator,filmToValidate);
        next();
    }catch (e) {
        res.err=e;
        next('error');
    }

}

module.exports={updateFilmValid,createFilmValid};
