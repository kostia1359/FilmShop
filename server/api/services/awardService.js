const AwardRepository=require('../../data/repositories/awardRepository');

class AwardService {
    getAll(){
        return AwardRepository.getAll();
    }

    async updateAward(id,data){
        if(data.hasOwnProperty('filmId')){
            await AwardRepository.setAwardFilm(id,data.filmId);

            delete data['filmId'];
        }
        return AwardRepository.updateById(id,data);
    }

    async postAward(data){
        const assignedFilm=data['filmId'];
        delete data['filmId'];

        const award= await AwardRepository.create(data);

        await AwardRepository.setAwardFilmCreating(award,assignedFilm);

        return award;
    }

    deleteAward(id){
        return AwardRepository.deleteById(id)
    }
    async setAwardFilm(id, film){


    }

    async getAward(id){
        const award= await AwardRepository.getById(id);

        if(!award){
            throw Error('award with this description does not exist');
        }

        return award;
    }
}

module.exports=new AwardService();