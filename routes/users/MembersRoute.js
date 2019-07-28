const MembersController = require('./../../controllers/users/MembersController');
const UserController = require('./../../controllers/admin/UserController');

module.exports = (route) => {
    route.route('/members').get(MembersController.index);
    route.route('/members/list').get(UserController.listView);
};
