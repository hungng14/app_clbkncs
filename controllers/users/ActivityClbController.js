const {
    responseError,
} = require('./../../libs/shared');
const { TITLE_USERS } = require('../../configs/constants');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            res.render('users/activity_clb/index', {
                layout: 'activity_clb',
                title: TITLE_USERS,
                activity: 'ActivityClb',
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
};
