module.exports = (orm, DataTypes) => {
    const Award = orm.define('award', {
            awardName: {
                type: DataTypes.STRING(25),
                allowNull: false
            },
            nominationName: {
                type: DataTypes.STRING(25),
                allowNull: false
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {timestamps: false}
    )

    return Award;
}