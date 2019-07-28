const NewsController = require('./../../controllers/users/NewsController');
const PostController = require('./../../controllers/admin/PostController');

module.exports = (route) => {
    route.route('/news').get(NewsController.index);
    route.route('/news/list-title').get(PostController.listTitleView);
};
