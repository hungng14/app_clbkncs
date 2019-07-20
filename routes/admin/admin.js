const express = require('express');

const admin = express.Router();
// const auth = require('../../libs/passport');

require('./default')(admin);

/* auth */
// admin.use((req, res, next) => {
//     auth.isAuthenticated(req, res, next);
// });
/* home */
require('./DashboardRoute')(admin);

/* user */
require('./UserRoute')(admin);

/* post */
require('./PostRoute')(admin);

/* info clb */
require('./InfoClbRoute')(admin);

/* info clb */
require('./RoleRoute')(admin);

module.exports = admin;
