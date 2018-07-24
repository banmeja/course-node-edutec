'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/prueba', md_auth.ensureAuth, UserController.prueba);
api.post('/register', UserController.register);
api.post('/login', UserController.login);

module.exports = api;