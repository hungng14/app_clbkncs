const passport = require('passport');
const {
    TITLE_ADMIN,
} = require('../../configs/constants');

const {
    responseError, responseSuccess, isEmpty,
} = require('../../libs/shared');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        if (req.isAuthenticated()) {
            return res.redirect('/admin');
        }
        res.render('admin/login/index', {
            layout: 'login',
            title: TITLE_ADMIN,
        });
    },
    login: async (req, res, next) => {
        try {
            passport.authenticate('local', (err, user) => { // eslint-disable-line
                if (err) {
                    return res.status(400).json({err});
                }
                if (!user) {
                    return res.json(responseError(1050));
                }
                req.login(user, (err) => { // eslint-disable-line
                    if (err) {
                        return next(err);
                    }
                    return res.json(responseSuccess(2050));
                });
            })(req, res, next);
        } catch (error) {
            return res.status(500).json(responseError(1001, error));
        }
    },
    logout: async (req, res) => { // eslint-disable-line
        try {
            req.logout();
            res.redirect('/login');
        } catch (error) {
            return res.json(error);
        }
    },
    getSession: async (req, res) => {
        if (!isEmpty(req.session.passport.user)) {
            res.json(req.session.passport.user);
        } else {
            res.json({});
        }
    },
};
