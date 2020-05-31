const DescriptionRepository=require('../../data/repositories/descriptionRepository');

class DescriptionService {
    getAll(){
        return DescriptionRepository.getAll();
    }

    updateDescription(id,data){
        return DescriptionRepository.updateById(id,data);
    }

    postDescription(data){
        return DescriptionRepository.create(data);
    }

    deleteDescription(id){
        return DescriptionRepository.deleteById(id)
    }

    getDescription(id){
        return DescriptionRepository.getById(id);
    }
}

module.exports=new DescriptionService();