const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { executeSql } = require('../configs/database');
const {
    getDataJoinWhere,
} = require('../libs/sqlStr');
const { comparePassword } = require('../services/UserService');
const { signJWT } = require('../configs/jsonwebtoken');
const {
    loginValidator,
} = require('../validator/LoginValidator');

const {
    responseError, responseSuccess,
    checkParamsValid,
} = require('../libs/shared');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, (async(req, username, password, done) => { // eslint-disable-line
        try {
            req.body.username = username;
            req.body.password = password;
            req.checkBody(loginValidator);
            const errors = req.validationErrors();
            if (errors) {
                return done(responseError(1002, errors));
            }
            const params = req.body;
            if (!checkParamsValid(params)) {
                return done(responseError(4004));
            }
            const select = `account.id, account.password, account.username,
            users.name, users.position, users.avatar`;
            const where = `account.username = N'${params.username}' AND account.status = 1`;
            const join = 'users ON  account.id = users.account_id';
            const sql = getDataJoinWhere('account', select, 'INNER', join, where);
            await executeSql(sql, async (data, err) => {
                if (err) { return done(null); }
                const user = data.recordset[0];
                const hashedPassword = user.password;
                const validPassword = await comparePassword(params.password, hashedPassword);
                if (!validPassword) {
                    return done(null);
                }
                const infoUser = {
                    name: user.name,
                    id: user.id,
                    username: user.username,
                    position: user.position,
                    avatar: user.avatar,
                };
                const token = await signJWT(infoUser);
                infoUser.token = token;
                return done(null, infoUser);
            });
        } catch (err) {
            return done(null);
        }
    })));

exports.isAuthenticated = (req, res, next) => { // eslint-disable-line
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
};
