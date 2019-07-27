const isEmpty = require('is-empty');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {
    TITLE_ADMIN,
} = require('../../configs/constants');

const {
    responseError, responseSuccess,
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
                    return res.status(400).json(responseError(1001, err));
                }
                if (!user) {
                    return res.json(responseError(1050));
                }
                req.logIn(user, (err) => { // eslint-disable-line
                    if (err) {
                        return next(err);
                    }
                    return res.json(responseSuccess(2050, user));
                });
            })(req, res, next);
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
    logout: async (req, res) => { // eslint-disable-line
        try {
            req.logout();
            res.redirect('/');
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
    createJSWToken: (req, res) => {
        const secretKey = 'w1lnWEN63FPKxBNmxHN7WpfW2IoYVYca5moqIUKfWesL1Ykwv34iR5xwfWLy';
        const environmentId = 'LJRQ1bju55p6a47RwadH';
        const payload = {
            iss: environmentId,
            user: {
                id: '123',
                email: 'joe.doe@example.com',
                name: 'Joe Doe'
            },
            services: {
                'ckeditor-collaboration': {
                    permissions: {
                        '*': 'write'
                    }
                }
            }
        };

        const result = jwt.sign(payload, secretKey, {
            algorithm: 'HS256',
        });
        res.send(result);
    },
};
