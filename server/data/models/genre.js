module.exports = (orm, DataTypes) => {
    const Genre = orm.define('genre', {
            genreName: {
                type: DataTypes.STRING(25),
                allowNull: false
            }
        }, {timestamps: false}
    )

    return Genre;
}