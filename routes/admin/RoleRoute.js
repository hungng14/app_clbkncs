const RoleController = require('./../../controllers/admin/RoleController');

module.exports = (route) => {
    route.route('/role/list').get(RoleController.list);
};
