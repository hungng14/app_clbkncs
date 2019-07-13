const {
    getInfoUserSession,
    getHeaders,
    responseError,
    sendBodyToAPI,
    sendQueryToAPI,
    sendDataToClient,
} = require('./../../libs/shared');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            // const Info = getInfoUserSession(req);
            res.render('dashboard/index', {
                layout: 'dashboard',
                title: ':: Sale fie App | Simplify sale field  ::',
                activity: 'Dashboard',
                // Info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
};
