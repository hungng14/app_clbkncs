const {
    responseError,
} = require('./../../libs/shared');
const { TITLE_USERS } = require('../../configs/constants');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            res.render('users/members/index', {
                layout: 'members',
                title: TITLE_USERS,
                activity: 'Members',
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
};
