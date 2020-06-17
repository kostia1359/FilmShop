const {createValid, updateValid} = require('./validator');
const userService = require('../services/userService');
const encryptPassword = require('../../helpers/encryptPassword');

const validator = {
    username: async function (str) {
        if (str.length === 0) {
            throw Error('username should not be empty');
        }

        const isUnique = !(await userService.findUser({username: str}));
        if (!isUnique) {
            throw Error('enter an unique username');
        }

        return str;
    },
    email: async function (str) {
        const isEmail = /[a-z0-9]+@[a-z]+\.[a-z]+/.test(str);

        if (!isEmail) {
            throw Error('enter a valid email');
        }

        const isUnique = !(await userService.findUser({email: str}));
        if (!isUnique) {
            throw Error('enter an unique email');
        }

        return str;
    },
    password: function (str) {
        if (str.length === 0) {
            throw Error('password should not be empty');
        }

        return str;
    },
    isEmailConfirmed: function (str) {
        return str;
    }
}

const createUserValid = async (req, res, next) => {
    const userToValidate = req.body;

    if(!userToValidate.hasOwnProperty('isEmailConfirmed')){
        userToValidate.isEmailConfirmed=encryptPassword(userToValidate.email);
    }

    try {
        res.data = await createValid(validator, userToValidate);
        next();
    } catch (e) {
        res.status(400).send(e.message);
    }
}

const updateUserValid = async (req, res, next) => {
    const userToValidate = req.body;

    try {
        res.data = await updateValid(validator, userToValidate);
        next();
    } catch (e) {
        res.err = e;
        next('error');
    }

}

module.exports = {updateUserValid, createUserValid};