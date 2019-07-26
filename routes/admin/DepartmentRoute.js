const DepartmentController = require('./../../controllers/admin/DepartmentController');

module.exports = (route) => {
    route.route('/department').get(DepartmentController.index);
    route.route('/department/getInfo').get(DepartmentController.getInfo);
    route.route('/department/update').post(DepartmentController.update);
};
