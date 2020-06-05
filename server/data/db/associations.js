function setAssociations(models) {
    const {Film, Genre, Award, Description} = models;

    Film.belongsToMany(Genre, {through: 'FilmGenres'});
    Film.hasMany(Award);
    Film.belongsTo(Description);

    Genre.belongsToMany(Film, {through: 'FilmGenres'});

    Description.hasOne(Film);

    Award.belongsTo(Film);
}

module.exports=setAssociations;