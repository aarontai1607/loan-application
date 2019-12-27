var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./user/UserController');
app.use('/users', UserController);

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

var LoanController = require('./loan/LoanController');
app.use('/loans', LoanController);

var ServerController = require('./server/ServerController');
app.use('/servers', ServerController);

module.exports = app;