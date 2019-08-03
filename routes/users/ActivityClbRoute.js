const ActivityClbController = require('./../../controllers/users/ActivityClbController');

module.exports = (route) => {
    route.route('/activity-clb').get(ActivityClbController.index);
};
