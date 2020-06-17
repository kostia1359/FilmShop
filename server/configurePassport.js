const UserService = require('./api/services/userService');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const encryptPassword = require('./helpers/encryptPassword');

function validatePassword(user, password) {
    const encryptedPassword = encryptPassword(password);

    return user.password === encryptedPassword;
}

exports.configuration = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(async function (id, done) {
        try {
            const user = await UserService.getUser(id);

            done(null, user);
        } catch (e) {
            done(e, null);
        }
    });
    passport.use(new LocalStrategy(
        async function (username, password, done) {
            const user = await UserService.findUser({username});

            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }

            const isPasswordValid = validatePassword(user, password);

            if (!isPasswordValid) {
                return done(null, false, {message: 'Incorrect password.'});
            }

            const isEmailConfirmed = user.isEmailConfirmed == 1;

            if (!isEmailConfirmed) {
                return done(null, false, {message: 'Confirm email'});
            }

            return done(null, user);
        }
    ));
}

exports.passport = passport;