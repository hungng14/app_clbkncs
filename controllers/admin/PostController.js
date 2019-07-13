const {
    responseError,
} = require('./../../libs/shared');
const { TITLE_ADMIN } = require('../../configs/constants');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            // const Info = getInfoUserSession(req);
            res.render('admin/post/index', {
                layout: 'post',
                title: TITLE_ADMIN,
                activity: 'Post',
                // Info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
};
