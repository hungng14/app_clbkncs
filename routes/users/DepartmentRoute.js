const DepartmentController = require('./../../controllers/users/DepartmentController');

module.exports = (route) => {
    route.route('/department/list-view').get(DepartmentController.listView);
    route.route('/department/info').get(DepartmentController.viewInfo);
};
