const PostController = require('./../../controllers/admin/PostController');

module.exports = (route) => {
    route.route('/post').get(PostController.index);
};
