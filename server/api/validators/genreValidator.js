const {createValid,updateValid}=require('./validator');

const validator={
    genreName:function (str) {
        if (str.length === 0) {
            throw Error('genreName should not be empty');
        }

        return str;
    }
}

const createGenreValid = async (req, res, next)=>{
    const genreToValidate=req.body;

    try {
        res.data= await createValid(validator,genreToValidate);
        next();
    }catch (e) {
        res.err=e;
        next('error');
    }
}

const updateGenreValid = async (req, res, next)=>{
    const genreToValidate=req.body;

    try{
        res.data= await updateValid(validator,genreToValidate);
        next();
    }catch (e) {
        res.err=e;
        next('error');
    }

}

module.exports={updateGenreValid,createGenreValid};