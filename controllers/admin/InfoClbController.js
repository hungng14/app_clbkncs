const {
    responseError,
} = require('./../../libs/shared');
const { TITLE_ADMIN } = require('../../configs/constants');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            // const Info = getInfoUserSession(req);
            res.render('admin/infoClb/index', {
                layout: 'infoClb',
                title: TITLE_ADMIN,
                activity: 'InfoClb',
                // Info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
};
