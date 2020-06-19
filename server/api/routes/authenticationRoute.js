const {Router} = require('express');
const userService = require('../services/userService');
const {responseMiddleware} = require('../middlewares/responseMiddleware');
const {errorMiddleware} = require('../middlewares/errorMiddleware');
const {createUserValid} = require('../validators/userValidator');
const passport = require('../../configurePassport').passport;
const nodemailer = require("nodemailer");
const {port} = require('../../env').app;
const {mail} = require('../../env');

const transporter = nodemailer.createTransport({
    pool:true,
    host:"smtp.ukr.net",
    port:465,
    secure:true,
    auth: {
        ...mail
    }
});
(async function(){
    transporter.verify(function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });
})();

const authenticate = passport.authenticate('local',
    {successRedirect: '/content/tables', failureRedirect: '/content/registration'});

const router = Router();

router.post('/login', authenticate);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/content/registration');
});

router.post('/registration', createUserValid, function (request, response) {
    const user=request.body;
    userService.postUser(user);
    const mailOptions = {
        from: mail.user,
        to: user.email,
        subject: 'Please, confirm your email',
        text: `http://localhost:${port}/users/verify/${user.isEmailConfirmed}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    response.status(200).send("Confirm email");
});

router.get('/verify/:token', async function (request, response) {
    const token = request.params.token;

    const users = await userService.getAll();


    for (let user of users) {
        if (user.isEmailConfirmed === token) {
            await userService.updateUser(user.id, {isEmailConfirmed: true});

            return response.status(200).send({status: 'Email confirmed'});
        }
    }

    response.status(404).send({status: 'Incorrect token'})
})

router.get('/login', function (request, response) {
    response.redirect('/content/registration');
})
router.use(responseMiddleware);
router.use(errorMiddleware);

module.exports = router;