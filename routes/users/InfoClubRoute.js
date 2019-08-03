const InfoClbController = require('./../../controllers/admin/InfoClbController');

module.exports = (route) => {
    route.route('/info-clb/info').get(InfoClbController.getInfoView);
};
