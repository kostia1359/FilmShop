const {createValid,updateValid}=require('./validator');
const filmService=require('../services/filmService');

const validator={
    awardName:function (str) {
        if (!str || str.length === 0) {
            throw Error('awardName should not be empty');
        }

        return str;
    },
    nominationName: function (str) {
        if (!str || str.length === 0) {
            throw Error('nominationName should not be empty');
        }

        return str;
    },
    year: function (str) {
        const isNumeric = /^[0-9]+$/.test(str);

        if (!isNumeric) {
            throw Error(`year should be a number`);
        }

        return Number(str);
    },
    filmId: async function (str) {
        const isNumeric = /^[0-9]+$/.test(str);

        if (!isNumeric) {
            throw Error(`filmId should be a number`);
        }

        const id= Number(str);

        const film = await filmService.getFilmByID(id);

        return film;
    }
}

const createAwardValid = async (req, res, next)=>{
    const awardToValidate=req.body;

    try {
        res.data= await createValid(validator,awardToValidate);

        next();
    }catch (e) {
        res.err=e;
        next('error');
    }
}

const updateAwardValid = async (req, res, next)=>{
    const awardToValidate=req.body;

    try{
        res.data= await updateValid(validator,awardToValidate);
        next();
    }catch (e) {
        res.err=e;
        next('error');
    }

}

module.exports={updateAwardValid,createAwardValid, awardValidator:validator};