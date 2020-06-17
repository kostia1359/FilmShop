const {salt} = require('../env').app;
const CryptoJS = require("crypto-js");

function encryptPassword(password) {
    return CryptoJS.PBKDF2(password, salt, {
        keySize: 256 / 32
    }).toString();
}

module.exports=encryptPassword;