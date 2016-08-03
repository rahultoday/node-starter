var express = require('express');
var login = express.Router();
var actions = require('../actions');
var model = require('../models');
login.post('/', function(req, res) {
  var user = new model.user();
  res.send('respond with a resource');
});

module.exports = login;
