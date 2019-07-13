const DashboardsController = require('./../../controllers/admin/DashboardController');

module.exports = (route) => {
    route.route('/dashboard').get(DashboardsController.index);
};
