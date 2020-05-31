class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    getAll() {
        return this.model.findAll();
    }

    getById(id) {
        return this.model.findByPk(id);
    }

    create(data) {
        return this.model.create(data);
    }

    async updateById(id, data) {
        return await this.model.update(data,
            {
                where: {id}
            });
    }

    deleteById(id) {
        return this.model.destroy({
            where: { id }
        });
    }
}

module.exports=BaseRepository;