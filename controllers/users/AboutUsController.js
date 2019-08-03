const {
    responseError,
} = require('./../../libs/shared');
const { TITLE_USERS } = require('../../configs/constants');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            res.render('users/about_us/index', {
                layout: 'about_us',
                title: TITLE_USERS,
                activity: 'About',
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
};
