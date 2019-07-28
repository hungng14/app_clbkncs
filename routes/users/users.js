const express = require('express');

const router = express.Router();

/* home */
require('./HomeRoute')(router);

/* about us */
require('./AboutUsRoute')(router);

/* members */
require('./MembersRoute')(router);

/* news */
require('./NewsRoute')(router);

/* info news */
require('./InfoNewsRoute')(router);

/* activity */
require('./ActivityClbRoute')(router);

/* info activity */
require('./InfoActivityClbRoute')(router);

module.exports = router;
