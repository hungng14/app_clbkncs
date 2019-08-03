const express = require('express');

const route = express.Router();

const LoginController = require('../../controllers/admin/LoginController');

route.route('/login').get(LoginController.index);
route.route('/login').post(LoginController.login);
route.route('/logout').get(LoginController.logout);
route.route('/getSession').get(LoginController.getSession);

module.exports = route;
