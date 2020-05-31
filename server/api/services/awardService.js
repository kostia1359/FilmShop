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

    getAward(id){
        return AwardRepository.getById(id);
    }
}

module.exports=new AwardService();