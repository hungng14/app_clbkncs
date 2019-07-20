/* eslint-disable consistent-return */
const {
    responseError,
    responseSuccess,
} = require('./../../libs/shared');
const { TITLE_ADMIN } = require('../../configs/constants');

// const UserService = require('../../services/UserService');

const { POSITION_USER } = require('../../configs/constants');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            // const Info = getInfoUserSession(req);
            res.render('admin/user/index', {
                layout: 'user',
                title: TITLE_ADMIN,
                activity: 'User',
                // Info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
    list: async (req, res) => {
        try {
            return res.json(responseSuccess(2001, POSITION_USER));
        } catch (error) {
            return res.json(responseError(1003, error));
        }
    },
};
