const PostController = require('./../../controllers/admin/PostController');

// eslint-disable-next-line func-names
function DashboardRoute(authRouter) {
    authRouter.route('/post').get(PostController.index);
}

module.exports = DashboardRoute;
