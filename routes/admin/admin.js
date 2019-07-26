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

/* category post */
require('./CategoryPostRoute')(admin);

/* info clb */
require('./InfoClbRoute')(admin);

/* role */
require('./RoleRoute')(admin);

/* department */
require('./DepartmentRoute')(admin);

module.exports = admin;
