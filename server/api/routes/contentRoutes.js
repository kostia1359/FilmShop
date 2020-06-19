const {Router} = require('express');
const mustAuthenticated=require('../../helpers/isAuthorized');
const request = require('request');


const router = Router();
const clientDirectory=__dirname.replace('\\server\\api\\routes','\\client\\');


router.get('/registration', function (request,response) {
    response.sendFile(clientDirectory+'registration.html');
})

router.get('/tables',mustAuthenticated, function (request,response) {

    response.sendFile(clientDirectory+'index.html');
})

router.post('/tables', mustAuthenticated,function (request, response) {

    response.redirect('/content/tables');
})

router.get('/filmImage/:year/:filmName',async function (req,response) {
    const year=Number(req.params.year);
    const filmName = req.params.filmName;
    let img;
    await request(`https://www.joblo.com/movie-posters/${year}/${filmName}`, function(err, res, body) {
        const lastIndex=body.indexOf('<a class="poster-image-ralated"');
        const srcIndex=body.indexOf('<img src="',lastIndex)+10;
        const lastSrcIndex=body.indexOf('"',srcIndex);

        img='https://www.joblo.com'+body.slice(srcIndex,lastSrcIndex);
        response.status(200).send({img});
    });
})

router.get('/additional',function (request,response) {

    response.sendFile(clientDirectory+'additional.html');
})

module.exports = router;