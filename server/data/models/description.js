module.exports = (orm, DataTypes) => {
    const Description = orm.define('description', {
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        }, {timestamps: false}
    )

    return Description;
}