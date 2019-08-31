const ActivityClbController = require('./../../controllers/users/ActivityClbController');


module.exports = (route) => {
    route.route('/activity-clb').get(ActivityClbController.index);
    route.route('/activity-clb/list-title').get(ActivityClbController.listTitleView);
    route.route('/activity-clb/detail').get(ActivityClbController.viewInfo);
    route.route('/activity-clb/listTitleViewHome').get(ActivityClbController.listTitleViewHome);
};
