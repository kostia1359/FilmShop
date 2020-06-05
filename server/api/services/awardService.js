const AwardRepository=require('../../data/repositories/awardRepository');

class AwardService {
    getAll(){
        return AwardRepository.getAll();
    }

    updateAward(id,data){
        return AwardRepository.updateById(id,data);
    }

    postAward(data){
        return AwardRepository.create(data);
    }

    deleteAward(id){
        return AwardRepository.deleteById(id)
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