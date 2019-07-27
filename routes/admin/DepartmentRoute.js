const DepartmentController = require('./../../controllers/admin/DepartmentController');

module.exports = (route) => {
    route.route('/department').get(DepartmentController.index);
    route.route('/department/add').get(DepartmentController.add);
    route.route('/department/edit').get(DepartmentController.edit);
    route.route('/department/list').get(DepartmentController.list);
    route.route('/department/create').post(DepartmentController.create);
    route.route('/department/getInfo').get(DepartmentController.getInfo);
    route.route('/department/update').post(DepartmentController.update);
    route.route('/department/delete').post(DepartmentController.delete);
};
