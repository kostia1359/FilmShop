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

    getGenre(id){
        return GenreRepository.getById(id);
    }
}

module.exports=new GenreService();