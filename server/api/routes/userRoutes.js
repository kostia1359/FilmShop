const {Router} = require('express');
const userService = require('../services/userService');
const {responseMiddleware} = require('../middlewares/responseMiddleware');
const {errorMiddleware} = require('../middlewares/errorMiddleware');
const {updateUserValid, createUserValid} = require('../validators/userValidator');

const router = Router();

router.get('/', async function (request, response, next) {
    response.data = await userService.getAll();

    next();
})


router.post('/', createUserValid, async function (request, response, next) {
    response.data = await userService.postUser(request.body);

    next()
})

router.put('/:id', updateUserValid, async function (request, response, next) {
    const id = request.params.id;

    await userService.updateUser(id, request.body);

    response.data = 'Updated successfully';

    next();
});

router.delete('/:id', async function (request, response, next) {
    const id = request.params.id;

    await userService.deleteUser(id);

    next();
})

router.use(responseMiddleware);
router.use(errorMiddleware);

module.exports = router;