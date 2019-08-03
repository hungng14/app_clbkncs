const {
    responseError,
} = require('./../../libs/shared');
const { TITLE_USERS } = require('../../configs/constants');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            res.render('users/news/index', {
                layout: 'news',
                title: TITLE_USERS,
                activity: 'News',
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
};
