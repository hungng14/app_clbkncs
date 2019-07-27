const {
    responseError, getInfoUserDecoded,
} = require('./../../libs/shared');
const { TITLE_ADMIN } = require('../../configs/constants');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            const info = getInfoUserDecoded(req.decoded);
            res.render('admin/dashboard/index', {
                layout: 'dashboard',
                title: TITLE_ADMIN,
                activity: 'Dashboard',
                info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
};
