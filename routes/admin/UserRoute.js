const UserController = require('./../../controllers/admin/UserController');

module.exports = (route) => {
    route.route('/user').get(UserController.index);
    route.route('/user/list').get(UserController.list);
    route.route('/user/getInfo').get(UserController.getInfo);
    route.route('/user/create').post(UserController.create);
    route.route('/user/update').post(UserController.update);
    route.route('/user/delete').post(UserController.delete);
    route.route('/account/createAccount').post(UserController.createAccount);
    route.route('/account/list').get(UserController.listAccount);
    route.route('/account/getInfoAccount').get(UserController.getInfoAccount);
    route.route('/account/updateAccount').post(UserController.updateAccount);
    route.route('/account/deleteAccount').post(UserController.deleteAccount);
};
