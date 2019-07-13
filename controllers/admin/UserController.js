const {
    responseError,
} = require('./../../libs/shared');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            // const Info = getInfoUserSession(req);
            res.render('user/index', {
                layout: 'user',
                title: ':: Sale fie App | Simplify sale field  ::',
                activity: 'User',
                // Info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
};
