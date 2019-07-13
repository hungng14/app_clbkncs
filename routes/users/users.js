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

/* activity */
require('./ActivityClbRoute')(router);

module.exports = router;
