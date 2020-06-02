const {createValid,updateValid}=require('./validator');

const validator={
    genreName:function (str) {
        if (str.length === 0) {
            throw Error('genreName should not be empty');
        }

        return str;
    }
}

const createGenreValid = (req, res, next)=>{
    const genreToValidate=req.body;

    try {
        res.data=createValid(validator,genreToValidate);
        next();
    }catch (e) {
        res.err=e;
        next('error');
    }
}

const updateGenreValid = (req, res, next)=>{
    const genreToValidate=req.body;

    try{
        res.data=updateValid(validator,genreToValidate);
        next();
    }catch (e) {
        res.err=e;
        next('error');
    }

}

module.exports={updateGenreValid,createGenreValid};