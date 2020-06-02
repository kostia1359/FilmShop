const {Router} = require('express');
const descriptionService = require('../services/descriptionService');
const {responseMiddleware} = require('../middlewares/responseMiddleware');
const {errorMiddleware} = require('../middlewares/errorMiddleware');
const {updateDescriptionValid, createDescriptionValid} = require('../validators/descriptionValidator');

const router = Router();

router.get('/', async function (request, response, next) {
    response.data = await descriptionService.getAll();

    next();
})

router.get('/:id', async function (request, response, next) {
    const id = request.params.id;
    response.data = await descriptionService.getDescription(id);

    next();
})

router.post('/', createDescriptionValid, async function (request, response, next) {
    response.data = await descriptionService.postDescription(request.body);

    next()
})

router.put('/:id', updateDescriptionValid, async function (request, response, next) {
    const id = request.params.id;

    await descriptionService.updateDescription(id, request.body);

    response.data = descriptionService.getDescription(id);

    next();
});

router.delete('/:id', async function (request, response, next) {
    const id = request.params.id;

    const deletedDescription = await descriptionService.getDescription(id);

    await descriptionService.deleteDescription(id);

    response.data = deletedDescription;

    next();
})

router.use(responseMiddleware);
router.use(errorMiddleware);

module.exports = router;