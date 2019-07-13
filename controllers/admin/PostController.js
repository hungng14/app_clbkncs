const {
    responseError,
} = require('./../../libs/shared');

module.exports = {
    index: async (req, res) => { // eslint-disable-line
        try {
            // const Info = getInfoUserSession(req);
            res.render('post/index', {
                layout: 'post',
                title: ':: Sale fie App | Simplify sale field  ::',
                activity: 'Post',
                // Info,
            });
        } catch (err) {
            res.status(500).json(responseError(1001, err));
        }
    },
};
