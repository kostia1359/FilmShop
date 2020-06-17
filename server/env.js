let dir = __dirname;
dir = dir.slice(0, dir.lastIndexOf('\\') + 1) + '.env';

require('dotenv').config({path: dir});

const env = {
    db: {
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    },
    app: {
        port:process.env.PORT,
        key:process.env.SECRET_KEY,
        salt:process.env.SALT
    }
}

module.exports = env;