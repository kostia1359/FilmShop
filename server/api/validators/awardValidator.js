const {createValid,updateValid}=require('./validator');

const validator={
    awardName:function (str) {
        if (str.length === 0) {
            throw Error('awardName should not be empty');
        }

        return str;
    },
    nominationName: function (str) {
        if (str.length === 0) {
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
    }
}

const createAwardValid = (req, res, next)=>{
    const awardToValidate=req.body;

    try {
        res.data=createValid(validator,awardToValidate);
        next();
    }catch (e) {
        res.err=e;
        next('error');
    }
}

const updateAwardValid = (req, res, next)=>{
    const awardToValidate=req.body;

    try{
        res.data=updateValid(validator,awardToValidate);
        next();
    }catch (e) {
        res.err=e;
        next('error');
    }

}

module.exports={updateAwardValid,createAwardValid};