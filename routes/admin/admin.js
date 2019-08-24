const express = require('express');

const admin = express.Router();
const auth = require('../../configs/passport');
const { verifyJWT } = require('../../configs/jsonwebtoken');
const { isEmpty, responseError } = require('../../libs/shared');

/* auth */
admin.use((req, res, next) => {
    auth.isAuthenticated(req, res, next);
});

admin.use(async (req, res, next) => {
    const { token } = req.session.passport.user;
    const decoded = await verifyJWT(token);
    if (isEmpty(decoded)) {
        return res.json(responseError(1004));
    }
    req.decoded = decoded;
    next();
});
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

/* upload files */
require('./UploadFileRoute')(admin);

/* activity clb */
require('./ActivityClbRoute')(admin);


module.exports = admin;
