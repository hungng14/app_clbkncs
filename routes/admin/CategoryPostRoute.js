const CategoryPostController = require('./../../controllers/admin/CategoryPostController');

module.exports = (route) => {
    route.route('/category-post/listActive').get(CategoryPostController.listActive);
    route.route('/category-post/create').post(CategoryPostController.create);
};
