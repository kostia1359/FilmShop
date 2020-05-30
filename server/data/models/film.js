module.exports = (orm, DataTypes) => {
    const Film = orm.define('film', {
            filmName: {
                type: DataTypes.STRING(25),
                allowNull: false
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            rating: {
                type: DataTypes.INTEGER,
                validate: {min: 1, max: 10}
            }
        }, {timestamps: false}
    )

    return Film;
}