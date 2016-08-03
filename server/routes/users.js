var express = require('express');
var users = express.Router();
var model = require('../models');
/* GET users listing. */
users.get('/', function(req, res) {
  console.log(req.body);
  res.send('respond with a resource');
});
users.put('/', function(req, res) {
  res.send('respond with a resource');
});
users.post('/', function(req, res) {
  var user  = new model.user();
  user.hashPassword(req.body.password,function(hash){
    user.set('digest', hash);
    user.set('user_name', req.body.username);
    user.save().then(function(u) {
        console.log('User saved:', u.get('user_name'));
        res.send('respond with a resource');
    });
  });
});

module.exports = users;
