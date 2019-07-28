const InfoNewsController = require('./../../controllers/users/InfoNewsController');

module.exports = (route) => {
    route.route('/news/detail').get(InfoNewsController.index);
};
