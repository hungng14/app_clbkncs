const MembersController = require('./../../controllers/users/MembersController');

module.exports = (route) => {
    route.route('/members').get(MembersController.index);
};
