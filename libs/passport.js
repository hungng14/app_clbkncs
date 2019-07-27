const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const rp = require('request-promise');
const {URL} = require('../configs/constants');

passport.serializeUser((user, done) => {
    user.Data.Token = user.Token; // eslint-disable-line
    done(null, user.Data);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, ((req, username, password, done) => { // eslint-disable-line
        try {
            const url = `${URL}login`;
            const options = {
                method: 'POST',
                uri: url,
                body: {
                    username,
                    password,
                },
                json: true, // Automatically stringifies the body to JSON
            };
            rp(options)
                .then((parsedBody) => {
                    if (parsedBody.Success) {
                        return done(null, parsedBody);
                    }
                    return done(null);
                })
            .catch(err => done(null)); // eslint-disable-line
        } catch (err) {
            return done(null);
        }
    })));

exports.isAuthenticated = (req, res, next) => { // eslint-disable-line
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
};
