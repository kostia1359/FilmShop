const {Router} = require('express');
const mustAuthenticated=require('../../helpers/isAuthorized');

const router = Router();
const clientDirectory=__dirname.replace('\\server\\api\\routes','\\client\\');


router.get('/registration', function (request,response) {
    response.sendFile(clientDirectory+'registration.html');
})

router.get('/tables',mustAuthenticated, function (request,response) {

    response.sendFile(clientDirectory+'index.html');
})

module.exports = router;