const UserController = require('./../../controllers/admin/UserController');

module.exports = (route) => {
    route.route('/user').get(UserController.index);
};
