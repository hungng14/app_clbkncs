const ActivityClbController = require('./../../controllers/admin/ActivityClbController');

module.exports = (route) => {
    route.route('/activity-clb').get(ActivityClbController.index);
    route.route('/activity-clb/list').get(ActivityClbController.list);
    route.route('/activity-clb/add').get(ActivityClbController.add);
    route.route('/activity-clb/edit').get(ActivityClbController.edit);
    route.route('/activity-clb/create').post(ActivityClbController.create);
    route.route('/activity-clb/update').post(ActivityClbController.update);
    route.route('/activity-clb/delete').post(ActivityClbController.delete);
};
