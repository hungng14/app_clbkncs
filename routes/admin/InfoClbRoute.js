const InfoClbController = require('./../../controllers/admin/InfoClbController');

module.exports = (route) => {
    route.route('/info-clb').get(InfoClbController.index);
    route.route('/info-clb/getInfo').get(InfoClbController.getInfo);
    route.route('/info-clb/update').post(InfoClbController.update);
};
