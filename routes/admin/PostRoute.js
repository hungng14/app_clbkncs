const PostController = require('./../../controllers/admin/PostController');

module.exports = (route) => {
    route.route('/post').get(PostController.index);
    route.route('/post/list').get(PostController.list);
    route.route('/post/add').get(PostController.add);
    route.route('/post/edit').get(PostController.edit);
    route.route('/post/create').post(PostController.create);
    route.route('/post/update').post(PostController.update);
};
