const InfoActivityClbController = require('./../../controllers/users/InfoActivityClbController');

module.exports = (route) => {
    route.route('/activity-clb/detail').get(InfoActivityClbController.index);
};
