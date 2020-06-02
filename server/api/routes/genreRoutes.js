const {Router} = require('express');
const genreService = require('../services/genreService');
const {responseMiddleware} = require('../middlewares/responseMiddleware');
const {errorMiddleware} = require('../middlewares/errorMiddleware');
const {updateGenreValid, createGenreValid} = require('../validators/genreValidator');

const router = Router();

router.get('/', async function (request, response, next) {
    response.data = await genreService.getAll();

    next();
})

router.get('/:id', async function (request, response, next) {
    const id = request.params.id;
    response.data = await genreService.getGenre(id);

    next();
})

router.post('/', createGenreValid, async function (request, response, next) {
    response.data = await genreService.postGenre(request.body);

    next()
})

router.put('/:id', updateGenreValid, async function (request, response, next) {
    const id = request.params.id;

    await genreService.updateGenre(id, request.body);

    response.data = await genreService.getGenre(id);

    next();
});

router.delete('/:id', async function (request, response, next) {
    const id = request.params.id;

    const deletedGenre = await genreService.getGenre(id);

    await genreService.deleteGenre(id);

    response.data = deletedGenre;

    next();
})

router.use(responseMiddleware);
router.use(errorMiddleware);

module.exports = router;