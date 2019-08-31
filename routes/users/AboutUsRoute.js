const AboutUsController = require('./../../controllers/users/AboutUsController');

module.exports = (route) => {
    route.route('/about-us').get(AboutUsController.index);
};
