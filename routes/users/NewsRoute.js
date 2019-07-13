const NewsController = require('./../../controllers/users/NewsController');

module.exports = (route) => {
    route.route('/news').get(NewsController.index);
};
