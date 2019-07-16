/* eslint-disable consistent-return */
const {
    responseError,
    responseSuccess,
} = require('./../../libs/shared');
const { TITLE_ADMIN } = require('../../configs/constants');

// const UserService = require('../../services/UserService');
const { executeSql } = require('../../configs/database');

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
            await executeSql('SELECT * FROM users', (data, err) => {
                if (err) { return res.json(responseError(4000, err)); }
                return res.json(responseSuccess(2001, data.recordset));
            });
        } catch (error) {
            return res.json(error);
        }
    },
};
