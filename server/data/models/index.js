const Sequelize = require('sequelize');
const config = require("../../config/dbConfig");
const associate = require('../db/associations');

const orm = new Sequelize(config);

const Film = require('../models/film')(orm, Sequelize);
const Award = require('../models/award')(orm, Sequelize);
const Description = require('../models/description')(orm, Sequelize);
const Genre = require('../models/genre')(orm, Sequelize);
const User = require('../models/user')(orm, Sequelize);

associate({Film, Award, Description, Genre});

(async function(){
    orm.sync();
})();

module.exports = {Film, Award, Description, Genre, User};