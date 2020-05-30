function setAssociations(models) {
    const {Film, Genre, Award, Description} = models;

    Film.belongsToMany(Genre, {through: 'FilmGenres'});
    Film.belongsToMany(Award, {through: 'FilmAwards'});
    Film.belongsTo(Description);

    Genre.belongsToMany(Film, {through: 'FilmGenres'});

    Description.hasOne(Film);

    Award.belongsToMany(Film, {through: 'FilmAwards'});
}

module.exports=setAssociations;