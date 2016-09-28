var express = require('express');
var login = express.Router();
var actions = require('../actions');
var model = require('../models');
login.post('/', function(req, res) {
  console.log(req);
  res.redirect('/starter.html');
});
module.exports = login;
