const {createValid,updateValid}=require('./validator');

const validator={
    username: function (str) {
        if (str.length === 0) {
            throw Error('username should not be empty');
        }

        return str;
    },
    email: function (str) {
        const isEmail=/[a-z0-9]+@[a-z]+\.[a-z]+/.test(str);

        if(!isEmail){
            throw Error('enter a valid email');
        }

        return str;
    },
    password: function (str) {
        if (str.length === 0) {
            throw Error('password should not be empty');
        }

        return str;
    }
}

const createUserValid = async (req, res, next)=>{
    const userToValidate=req.body;

    try {
        res.data= await createValid(validator,userToValidate);
        next();
    }catch (e) {
        res.err=e;
        next('error');
    }
}

const updateUserValid = async (req, res, next)=>{
    const userToValidate=req.body;

    try{
        res.data= await updateValid(validator,userToValidate);
        next();
    }catch (e) {
        res.err=e;
        next('error');
    }

}

module.exports={updateUserValid,createUserValid};