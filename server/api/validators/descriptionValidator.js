const {createValid,updateValid}=require('./validator');

const validator={
    description:function (str) {
        if (str.length === 0) {
            throw Error('description should not be empty');
        }

        return str;
    }
}

const createDescriptionValid = async (req, res, next)=>{
    const descriptionToValidate=req.body;

    try {
        res.data= await createValid(validator,descriptionToValidate);
        next();
    }catch (e) {
        res.err=e;
        next('error');
    }
}

const updateDescriptionValid = async (req, res, next)=>{
    const descriptionToValidate=req.body;

    try{
        res.data=await updateValid(validator,descriptionToValidate);
        next();
    }catch (e) {
        res.err=e;
        next('error');
    }

}

module.exports={updateDescriptionValid,createDescriptionValid};