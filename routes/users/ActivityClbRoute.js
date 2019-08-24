const ActivityClbController = require('./../../controllers/users/ActivityClbController');
const AdminActivityClbController = require('./../../controllers/admin/ActivityClbController');


module.exports = (route) => {
    route.route('/activity-clb').get(ActivityClbController.index);
    route.route('/activity-clb/list-title').get(AdminActivityClbController.listTitleView);
};
