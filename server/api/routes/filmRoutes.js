const {Router} = require('express');
const filmService = require('../services/filmService');
const {responseMiddleware} = require('../middlewares/responseMiddleware');
const {errorMiddleware} = require('../middlewares/errorMiddleware');
const {updateFilmValid, createFilmValid} = require('../validators/filmValidator');

const router = Router();

router.get('/', async function (request, response, next) {
    response.data = await filmService.getAll();

    next();
})

router.get('/:id', async function (request, response, next) {
    const id = request.params.id;
    response.data = await filmService.getFilm(id);

    next();
})

router.post('/', createFilmValid, async function (request, response, next) {
    response.data = await filmService.postFilm(request.body);

    next()
})

router.put('/:id',updateFilmValid, async function (request, response, next) {
    const id = request.params.id;

    await filmService.updateFilm(id, request.body);

    response.data = await filmService.getFilm(id);

    next();
});

router.delete('/:id', async function (request, response, next) {
    const id = request.params.id;

    const deletedFilm = await filmService.getFilm(id);

    await filmService.deleteFilm(id);

    response.data = deletedFilm;

    next();
})

router.use(responseMiddleware);
router.use(errorMiddleware);

module.exports = router;