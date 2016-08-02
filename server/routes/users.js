var express = require('express');
var router = express.Router();
var actions = require('../actions');
var model = require('../models');
/* GET users listing. */
router.get('/', function(req, res) {
  var user  = new model.user();
  user.set('digest', 'dkfnsdkk');
  user.set('user_name', 'joe@example.com');
  user.save().then(function(u) {
      console.log('User saved:', u.get('user_name'));
  });
  res.send('respond with a resource');
});

module.exports = router;
