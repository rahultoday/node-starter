var express = require('express');
var users = express.Router();
var model = require('../models');
/* GET users listing. */
users.get('/', function(req, res) {
  res.send('respond with a resource');
});
users.put('/', function(req, res) {
  res.send('respond with a resource');
});
users.post('/', function(req, res) {
  var user  = new model.user();
  user.hashPassword("test1",function(hash){
     console.log(req.body);
    user.set('digest', hash);
    user.set('user_name', req.body.username);
    user.set('first_name', req.body.first_name);
    user.set('second_name', req.body.second_name);
    user.set('role', req.body.role);
    user.set('image_path', req.body.image_path);
    user.save().then(function(u) {
        console.log('User saved:', u.get('user_name'));
        res.send('user saved');
    });
  });
});

module.exports = users;
