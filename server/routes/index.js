var users = require('./users');
var login = require('./login');
var router = [{
  url : '/users',
  action: users
},{
  url : '/login',
  action: login
}]
module.exports = router;
