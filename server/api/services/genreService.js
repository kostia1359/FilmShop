const GenreRepository=require('../../data/repositories/genreRepository');

class GenreService {
    getAll(){
        return GenreRepository.getAll();
    }

    updateGenre(id,data){
        return GenreRepository.updateById(id,data);
    }

    postGenre(data){
        return GenreRepository.create(data);
    }

    deleteGenre(id){
        return GenreRepository.deleteById(id)
    }

    async getGenre(id){
        const genre= await GenreRepository.getById(id);

        if(!genre) {
            throw Error('genre with this id does not exist');
        }

        return genre;
    }
}

module.exports=new GenreService();