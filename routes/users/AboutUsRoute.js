const AboutUsController = require('./../../controllers/users/AboutUsController');
const DepartmentController = require('./../../controllers/admin/DepartmentController');

module.exports = (route) => {
    route.route('/about-us').get(AboutUsController.index);
    route.route('/about-us/list-departments').get(DepartmentController.listView);
};
