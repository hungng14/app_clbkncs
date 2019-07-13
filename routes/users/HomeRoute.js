const HomeController = require('./../../controllers/users/HomeController');

module.exports = (route) => {
    route.route('/').get(HomeController.index);
};
