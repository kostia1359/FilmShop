const {Router} = require('express');
const awardService = require('../services/awardService');
const {responseMiddleware} = require('../middlewares/responseMiddleware');

const router = Router();

router.get('/', async function (request, response, next) {
    response.data = await awardService.getAll();

    next();
})

router.get('/:id', async function (request, response, next) {
    const id = request.params.id;
    response.data = await awardService.getAward(id);

    next();
})

router.post('/', async function (request, response, next) {
    response.data = await awardService.postAward(request.body);

    next()
})

router.put('/:id', async function (request, response, next) {
    const id = request.params.id;

    await awardService.updateAward(id, request.body);

    response.data = await awardService.getAward(id);

    next();
});

router.delete('/:id', async function (request, response, next) {
    const id = request.params.id;

    const deletedAward = await awardService.getAward(id);

    await awardService.deleteAward(id);

    response.data = deletedAward;

    next();
})

router.use(responseMiddleware);

module.exports = router;