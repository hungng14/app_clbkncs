const LoginController = require('../../controllers/admin/LoginController');

module.exports = (route) => {
    route.route('/login').get(LoginController.index);
    route.route('/login').post(LoginController.login);
    route.route('/logout').get(LoginController.logout);
    route.route('/getSession').get(LoginController.getSession);
};
