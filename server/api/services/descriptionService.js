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

    async getDescription(id){
        const description = await DescriptionRepository.getById(id);

        if(!description){
            throw Error('description with this id does not exist');
        }

        return description;
    }
}

module.exports=new DescriptionService();